import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sortByStatus } from "@/helpers";
import { getTodos } from "@/api/requests";
import { SortedTodos } from "@/components/types";
import { AppDispatch, RootState } from "@/state/store";
import { setPendingTodos } from "@/state/todos/todoPendingSlice";
import { setCompletedTodos } from "@/state/todos/todoCompletedSlice";
import { setOverdueTodos } from "@/state/todos/todoOverdueSlice";
import { setRemovedTodos } from "@/state/todos/todoRemovedSlice";

export const useHistoryTodos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todoPending = useSelector((state: RootState) => state.todoPending.data);
  const todoCompleted = useSelector((state: RootState) => state.todoCompleted.data);
  const todoOverdue = useSelector((state: RootState) => state.todoOverdue.data);
  const todosRemoved = useSelector((state: RootState) => state.todoRemoved.data);

  useEffect(() => {
    if (
      !todoPending.length &&
      !todoCompleted.length &&
      !todoOverdue.length &&
      !todosRemoved.length
    ) {
      (async () => {
        const response = await getTodos();

        if (response.length) {
          const todosData: SortedTodos = sortByStatus(response);

          dispatch(setPendingTodos(todosData.pending));
          dispatch(setCompletedTodos(todosData.completed));
          dispatch(setOverdueTodos(todosData.overdue));
          dispatch(setRemovedTodos(todosData.removed));
        }
      })();
    }
  }, []);

  return useMemo(() => {
    // sort items by last updated time
    return [...todoPending, ...todoCompleted, ...todoOverdue, ...todosRemoved]
      .sort((x, y) => new Date(x.updatedAt).getTime() - new Date(y.updatedAt).getTime())
      .reverse();
  }, [todoPending, todoCompleted, todoOverdue, todosRemoved]);
};
