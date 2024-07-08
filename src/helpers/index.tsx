import { textColors } from "@/constants";
import { TodoType, TodoStatus, SortedTodos, initAcc } from "@/components/types";

export const getStatusColor = (status?: string) => {
  switch (status) {
    case TodoStatus.Pending:
      return "secondary";
    case TodoStatus.Completed:
      return "success";
    case TodoStatus.Overdue:
      return "warning";
    case TodoStatus.Removed:
      return "error";
    default:
      return "primary";
  }
};

export const getStatusTextColor = (status: string) => {
  switch (status) {
    case TodoStatus.Pending:
      return textColors["secondary.main"];
    case TodoStatus.Completed:
      return textColors["success.main"];
    case TodoStatus.Overdue:
      return textColors["warning.main"];
    case TodoStatus.Removed:
      return textColors["error.main"];
    default:
      return textColors["text.primary"];
  }
};

export const sortByStatus = (todos: TodoType[]): SortedTodos => {
  return todos.reduce((acc: SortedTodos, curr: TodoType) => {
    switch (curr.status) {
      case TodoStatus.Pending:
        acc.pending.push(curr);
        return acc;
      case TodoStatus.Completed:
        acc.completed.push(curr);
        return acc;
      case TodoStatus.Overdue:
        acc.overdue.push(curr);
        return acc;
      case TodoStatus.Removed:
        acc.removed.push(curr);
        return acc;
      default:
        return acc;
    }
  }, initAcc);
};
