import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import { TodoStatus } from "@/components/types";
import { getStatusTextColor } from "@/helpers";

function Pending() {
  return (
    <PageWrapper title="Pending todos">
      <TodoTable
        page={1}
        limit={10}
        rows={[]}
        setUrlParam={() => {}}
        bgColor={getStatusTextColor(TodoStatus.Pending)}
      />
    </PageWrapper>
  );
}

export default Pending;