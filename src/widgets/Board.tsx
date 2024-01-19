/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, DragEvent } from "react";

type Task = {
  id: number;
  title: string;
};

type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

export const BoardWidget = () => {
  const [draggedTask, setDraggedTask] = useState<Task>();
  const [taskDraggedColumnId, setTaskDraggedColumnId] = useState<number>();
  const [draggedColumn, setDraggedColumn] = useState<Column>();

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 1,
      title: "col 1",
      tasks: [
        { id: 1, title: "aaaa" },
        { id: 2, title: "bbbb" },
        { id: 3, title: "cccc" },
      ],
    },
    {
      id: 2,
      title: "col 2",
      tasks: [
        { id: 4, title: "dddd" },
        { id: 5, title: "eeee" },
        { id: 6, title: "ffff" },
      ],
    },
    {
      id: 3,
      title: "col 3",
      tasks: [
        { id: 7, title: "gggg" },
        { id: 8, title: "hhhh" },
        { id: 9, title: "iiii" },
      ],
    },
  ]);

  const onTaskDragStart = (
    _e: DragEvent<HTMLDivElement>,
    task: Task,
    columnId: number
  ) => {
    setDraggedTask(task);
    setTaskDraggedColumnId(columnId);
  };

  const onTaskDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onColumnDragStart = (_e: DragEvent<HTMLDivElement>, column: Column) => {
    setDraggedColumn(column);
  };

  const onColumnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onTaskDrop = (
    e: DragEvent<HTMLDivElement>,
    id: number,
    columnId: number,
    spacer?: number
  ) => {
    e.preventDefault();
    if (!draggedTask || id === draggedTask.id) return;
    setDraggedTask(undefined);
    setTaskDraggedColumnId(undefined);

    const mouseY = e.clientY;
    const { y, height } = e.currentTarget.getBoundingClientRect();
    const middlePoint = y + Math.floor(height / 2);

    const columnIndex = columns.findIndex((col) => col.id === columnId);

    const updatedTasks = columns[columnIndex].tasks.filter(
      (task) => task.id !== draggedTask.id
    );

    const insertIndex = updatedTasks.findIndex((task) => task.id === id);

    if (mouseY > middlePoint || spacer === 1)
      updatedTasks.splice(insertIndex + 1, 0, draggedTask);
    else if (spacer === -1) updatedTasks.splice(0, 0, draggedTask);
    else updatedTasks.splice(insertIndex, 0, draggedTask);

    setColumns((prev) => {
      const currentColumnIndex = columns.findIndex(
        (col) => col.id === taskDraggedColumnId
      );

      if (currentColumnIndex !== columnIndex) {
        const currentColumnUpdatedTasks = columns[
          currentColumnIndex
        ].tasks.filter((task) => task.id !== draggedTask.id);
        prev[currentColumnIndex].tasks = currentColumnUpdatedTasks;
      }

      prev[columnIndex].tasks = updatedTasks;

      return [...prev];
    });
  };

  const onColumnDrop = (
    e: DragEvent<HTMLDivElement>,
    id: number,
    spacer?: number
  ) => {
    e.preventDefault();
    if (draggedTask || !draggedColumn || id === draggedColumn?.id) return;
    setDraggedColumn(undefined);

    const mouseX = e.clientX;
    const { x, width } = e.currentTarget.getBoundingClientRect();
    const middlePoint = x + Math.floor(width / 2);

    const updatedColumns = columns.filter((col) => col.id !== draggedColumn.id);

    const insertIndex = updatedColumns.findIndex((col) => col.id === id);

    if (mouseX > middlePoint || spacer === 1)
      updatedColumns.splice(insertIndex + 1, 0, draggedColumn);
    else if (spacer === -1) updatedColumns.splice(0, 0, draggedColumn);
    else updatedColumns.splice(insertIndex, 0, draggedColumn);

    setColumns(updatedColumns);
  };

  return (
    <main className="container mt-8 flex items-start px-8 pb-5 overflow-x-auto">
      <div
        className="min-h-[75vh] w-5 bg-white"
        onDrop={(e) => onColumnDrop(e, -1, -1)}
        onDragOver={onColumnDragOver}
      />
      {columns.map((column) => (
        <>
          <div
            draggable
            key={`column-${column.id}`}
            className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 max-h-[75vh] overflow-x-clip overflow-y-auto"
            onDragOver={onColumnDragOver}
            onDrop={(e) => onColumnDrop(e, column.id)}
            onDragStart={(e) => onColumnDragStart(e, column)}
          >
            <div className="grid">
              <p>{column.title}</p>

              <div
                className="h-10 w-64"
                onDrop={(e) => onTaskDrop(e, -1, column.id, -1)}
                onDragOver={onTaskDragOver}
              />

              {column.tasks.map((task) => (
                <>
                  <div
                    key={`task-${task.id}`}
                    className="bg-white p-4 rounded-lg shadow-md w-64 text-black"
                    draggable
                    onDragStart={(e) => onTaskDragStart(e, task, column.id)}
                    onDragOver={onTaskDragOver}
                    onDrop={(e) => onTaskDrop(e, task.id, column.id)}
                  >
                    <p className="text-xl font-semibold mb-2">{task.title}</p>
                  </div>

                  <div
                    className="h-5 w-64"
                    onDrop={(e) => onTaskDrop(e, task.id, column.id, 1)}
                    onDragOver={onTaskDragOver}
                  />
                </>
              ))}
            </div>
          </div>

          <div
            className="min-h-[75vh] w-5 bg-white"
            onDrop={(e) => onColumnDrop(e, column.id, 1)}
            onDragOver={onColumnDragOver}
          />
        </>
      ))}
    </main>
  );
};
