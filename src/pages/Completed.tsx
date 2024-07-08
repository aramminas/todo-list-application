import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodoTable from "@/components/TodoTable";
import { getStatusTextColor } from "@/helpers";
import { TodoStatus } from "@/components/types";
import PageWrapper from "@/components/PageWrapper";
import { AppDispatch, RootState } from "@/state/store";
import { getCompletedTodos } from "@/state/todos/todoCompletedSlice";

function Completed() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todoCompleted.data);

  useEffect(() => {
    dispatch(getCompletedTodos());
  }, []);

  return (
    <PageWrapper title="Completed todos">
      <TodoTable rows={todos} bgColor={getStatusTextColor(TodoStatus.Completed)} />
    </PageWrapper>
  );
}

export default Completed;
