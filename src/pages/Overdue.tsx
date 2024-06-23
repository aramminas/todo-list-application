import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import { TodoStatus } from "@/components/types";
import { getStatusTextColor } from "@/helpers";

function Overdue() {
  return (
    <PageWrapper title="Overdue todos">
      <TodoTable
        page={1}
        limit={10}
        rows={[]}
        setUrlParam={() => {}}
        bgColor={getStatusTextColor(TodoStatus.Overdue)}
      />
    </PageWrapper>
  );
}

export default Overdue;
