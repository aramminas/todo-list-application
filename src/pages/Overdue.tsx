import { useSelector } from "react-redux";

import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import { TodoStatus } from "@/components/types";
import { getStatusTextColor } from "@/helpers";
import { RootState } from "@/state/store";

function Overdue() {
  const todos = useSelector((state: RootState) => state.todoOverdue.data);

  return (
    <PageWrapper title="Overdue todos">
      <TodoTable
        page={1}
        limit={10}
        rows={todos}
        setUrlParam={() => {}}
        bgColor={getStatusTextColor(TodoStatus.Overdue)}
      />
    </PageWrapper>
  );
}

export default Overdue;
