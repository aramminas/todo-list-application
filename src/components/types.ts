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
