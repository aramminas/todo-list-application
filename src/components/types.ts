export type TodoType = {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  deadline: Date;
  updatedAt: Date;
  createdAt: Date;
};

export enum TodoStatus {
  Pending = "Pending",
  Completed = "Completed",
  Overdue = "Overdue",
  Removed = "Removed",
}

export type TodoDataType = Omit<TodoType, "id" | "status" | "updatedAt" | "createdAt">;

export const resetInitialData = {
  title: "",
  description: "",
  deadline: "",
};
