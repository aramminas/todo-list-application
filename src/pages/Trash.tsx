import { useSelector } from "react-redux";

import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import { TodoStatus } from "@/components/types";
import { getStatusTextColor } from "@/helpers";
import { RootState } from "@/state/store";

function Trash() {
  const todos = useSelector((state: RootState) => state.todoRemoved.data);

  return (
    <PageWrapper title="Removed todos">
      <TodoTable
        page={1}
        limit={10}
        rows={todos}
        setUrlParam={() => {}}
        bgColor={getStatusTextColor(TodoStatus.Removed)}
      />
    </PageWrapper>
  );
}

export default Trash;
