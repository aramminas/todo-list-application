import { useSelector } from "react-redux";

import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import { getStatusTextColor } from "@/helpers";
import { TodoStatus } from "@/components/types";
import { RootState } from "@/state/store";

function Completed() {
  const todos = useSelector((state: RootState) => state.todoCompleted.data);

  return (
    <PageWrapper title="Completed todos">
      <TodoTable
        page={1}
        limit={10}
        rows={todos}
        setUrlParam={() => {}}
        bgColor={getStatusTextColor(TodoStatus.Completed)}
      />
    </PageWrapper>
  );
}

export default Completed;
