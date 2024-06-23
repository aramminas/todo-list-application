import { textColors } from "@/constants";
import { TodoStatus } from "@/components/types";

export const getStatusColor = (status: string) => {
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
      return "grey";
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
