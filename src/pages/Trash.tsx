import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import { TodoStatus } from "@/components/types";
import { getStatusTextColor } from "@/helpers";

function Trash() {
  return (
    <PageWrapper title="Removed todos">
      <TodoTable
        page={1}
        limit={10}
        rows={[]}
        setUrlParam={() => {}}
        bgColor={getStatusTextColor(TodoStatus.Removed)}
      />
    </PageWrapper>
  );
}

export default Trash;
