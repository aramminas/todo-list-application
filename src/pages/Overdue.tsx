import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStatusTextColor } from "@/helpers";
import TodoTable from "@/components/TodoTable";
import { TodoStatus } from "@/components/types";
import PageWrapper from "@/components/PageWrapper";
import { AppDispatch, RootState } from "@/state/store";
import { getOverdueTodos } from "@/state/todos/todoOverdueSlice";

function Overdue() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todoOverdue.data);

  useEffect(() => {
    dispatch(getOverdueTodos());
  }, []);

  return (
    <PageWrapper title="Overdue todos">
      <TodoTable rows={todos} bgColor={getStatusTextColor(TodoStatus.Overdue)} />
    </PageWrapper>
  );
}

export default Overdue;
