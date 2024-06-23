import { useMemo } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export const useHistoryTodos = () => {
  const todoPending = useSelector((state: RootState) => state.todoPending.data);
  const todoCompleted = useSelector((state: RootState) => state.todoCompleted.data);
  const todoOverdue = useSelector((state: RootState) => state.todoOverdue.data);
  const todosRemoved = useSelector((state: RootState) => state.todoRemoved.data);

  return useMemo(() => {
    // sort items by last updated time
    return [...todoPending, ...todoCompleted, ...todoOverdue, ...todosRemoved].sort(
      (x, y) => x.updatedAt - y.updatedAt,
    );
  }, [todoPending, todoCompleted, todoOverdue, todosRemoved]);
};
