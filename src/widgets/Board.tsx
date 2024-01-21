import { useState, DragEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddNewColumn, AddNewTask, EditColumn, EditTask } from "src/feature";
import { updateColumn, orderColumns } from "src/store/boardSlice";
import { Task, Column } from "src/store/types";

export const BoardWidget = () => {
  const [draggedTask, setDraggedTask] = useState<Task>();
  const [taskDraggedColumnId, setTaskDraggedColumnId] = useState<number>();
  const [draggedColumn, setDraggedColumn] = useState<Column>();

  const columns = useSelector((state: { columns: Column[] }) => state.columns);
  const dispatch = useDispatch();

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

    dispatch(
      updateColumn({
        mouseY,
        middlePoint,
        columnId,
        draggedTask,
        id,
        taskDraggedColumnId,
        spacer,
      })
    );
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

    dispatch(orderColumns({ mouseX, middlePoint, spacer, draggedColumn, id }));
  };

  return (
    <main className="container mt-8 flex items-start px-8 pb-5 overflow-x-scroll shadow-lg">
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
            className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 max-h-[75vh] overflow-y-auto flex-shrink-0"
            onDragOver={onColumnDragOver}
            onDrop={(e) => onColumnDrop(e, column.id)}
            onDragStart={(e) => onColumnDragStart(e, column)}
          >
            <div className="grid">
              <div className="flex justify-between">
                <p>{column.title}</p>

                <EditColumn title={column.title} columnId={column.id} />
              </div>

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
                    <div className="flex justify-between">
                      <p className="text-xl font-semibold mb-2">{task.title}</p>

                      <EditTask
                        columnId={column.id}
                        taskId={task.id}
                        title={task.title}
                      />
                    </div>
                  </div>

                  <div
                    className="h-5 w-64"
                    onDrop={(e) => onTaskDrop(e, task.id, column.id, 1)}
                    onDragOver={onTaskDragOver}
                  />
                </>
              ))}

              <AddNewTask columnId={column.id} />
            </div>
          </div>

          <div
            className="min-h-[75vh] w-5 bg-white flex-shrink-0"
            onDrop={(e) => onColumnDrop(e, column.id, 1)}
            onDragOver={onColumnDragOver}
          />
        </>
      ))}

      <AddNewColumn />
    </main>
  );
};
