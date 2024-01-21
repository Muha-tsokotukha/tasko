import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Column,
  UpdateColumnPayload,
  OrderColumnsPayload,
  AddColumnPayload,
} from "./types";

const initialState: Column[] = [
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
];

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    updateColumn(state, action: PayloadAction<UpdateColumnPayload>) {
      const {
        taskDraggedColumnId,
        draggedTask,
        columnId,
        id,
        mouseY,
        middlePoint,
        spacer,
      } = action.payload;

      const columnIndex = state.findIndex((col) => col.id === columnId);

      const updatedTasks = state[columnIndex].tasks.filter(
        (task) => task.id !== draggedTask.id
      );

      const insertIndex = updatedTasks.findIndex((task) => task.id === id);

      if (mouseY > middlePoint || spacer === 1)
        updatedTasks.splice(insertIndex + 1, 0, draggedTask);
      else if (spacer === -1) updatedTasks.splice(0, 0, draggedTask);
      else updatedTasks.splice(insertIndex, 0, draggedTask);

      const currentColumnIndex = state.findIndex(
        (col) => col.id === taskDraggedColumnId
      );

      if (currentColumnIndex !== columnIndex) {
        const currentColumnUpdatedTasks = state[
          currentColumnIndex
        ].tasks.filter((task) => task.id !== draggedTask.id);
        state[currentColumnIndex].tasks = currentColumnUpdatedTasks;
      }

      state[columnIndex].tasks = updatedTasks;
    },

    orderColumns(state, action: PayloadAction<OrderColumnsPayload>) {
      const { draggedColumn, id, mouseX, middlePoint, spacer } = action.payload;

      const updatedColumns = state.filter((col) => col.id !== draggedColumn.id);

      const insertIndex = updatedColumns.findIndex((col) => col.id === id);

      if (mouseX > middlePoint || spacer === 1)
        updatedColumns.splice(insertIndex + 1, 0, draggedColumn);
      else if (spacer === -1) updatedColumns.splice(0, 0, draggedColumn);
      else updatedColumns.splice(insertIndex, 0, draggedColumn);

      return updatedColumns;
    },

    addColumn(state, action: PayloadAction<AddColumnPayload>) {
      const { title } = action.payload;
      state.push({ id: new Date().getTime(), title, tasks: [] });
    },
  },
});

export default columnsSlice.reducer;

export const { updateColumn, orderColumns } = columnsSlice.actions;
