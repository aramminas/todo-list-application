import { useSelector } from "react-redux";

import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import { TodoStatus } from "@/components/types";
import { getStatusTextColor } from "@/helpers";
import { RootState } from "@/state/store";

function Pending() {
  const todos = useSelector((state: RootState) => state.todoPending.data);

  return (
    <PageWrapper title="Pending todos">
      <TodoTable rows={todos} bgColor={getStatusTextColor(TodoStatus.Pending)} />
    </PageWrapper>
  );
}

export default Pending;
