import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import { getStatusTextColor } from "@/helpers";
import { TodoStatus } from "@/components/types";

function Completed() {
  return (
    <PageWrapper title="Completed todos">
      <TodoTable
        page={1}
        limit={10}
        rows={[]}
        setUrlParam={() => {}}
        bgColor={getStatusTextColor(TodoStatus.Completed)}
      />
    </PageWrapper>
  );
}

export default Completed;
