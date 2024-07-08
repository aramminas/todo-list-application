import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getStatusTextColor } from "@/helpers";
import TodoTable from "@/components/TodoTable";
import { TodoStatus } from "@/components/types";
import PageWrapper from "@/components/PageWrapper";
import { RootState, AppDispatch } from "@/state/store";
import { getRemovedTodos } from "@/state/todos/todoRemovedSlice";

function Trash() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todoRemoved.data);

  useEffect(() => {
    dispatch(getRemovedTodos());
  }, []);

  return (
    <PageWrapper title="Removed todos">
      <TodoTable rows={todos} bgColor={getStatusTextColor(TodoStatus.Removed)} />
    </PageWrapper>
  );
}

export default Trash;
