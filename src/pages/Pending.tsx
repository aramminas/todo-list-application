import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStatusTextColor } from "@/helpers";
import TodoTable from "@/components/TodoTable";
import { TodoStatus } from "@/components/types";
import PageWrapper from "@/components/PageWrapper";
import { AppDispatch, RootState } from "@/state/store";
import { getPendingTodos } from "@/state/todos/todoPendingSlice";

function Pending() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todoPending.data);

  useEffect(() => {
    dispatch(getPendingTodos());
  }, []);

  return (
    <PageWrapper title="Pending todos">
      <TodoTable rows={todos} bgColor={getStatusTextColor(TodoStatus.Pending)} />
    </PageWrapper>
  );
}

export default Pending;
