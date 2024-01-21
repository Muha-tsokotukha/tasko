export type Task = {
  id: number;
  title: string;
};

export type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

// Payload

export type UpdateColumnPayload = {
  mouseY: number;
  middlePoint: number;
  columnId: number;
  draggedTask: Task;
  id: number;
  taskDraggedColumnId?: number;
  spacer?: number;
};

export type OrderColumnsPayload = {
  mouseX: number;
  middlePoint: number;
  spacer?: number;
  draggedColumn: Column;
  id: number;
};

export type AddColumnPayload = {
  title: string;
};

export type EditColumnPayload = {
  title: string;
  id: number;
};

export type AddTaskPayload = {
  title: string;
  columnId: number;
};

export type EditTaskPayload = {
  title: string;
  id: number;
  columnId: number;
};

export type DeleteColumnPayload = {
  id: number;
};

export type DeleteTaskPayload = {
  columnId: number;
  id: number;
};
