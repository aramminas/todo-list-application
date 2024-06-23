import NoData from "@/components/basic/NoData";
import { StyledTableCell, StyledTableRow } from "@/components/TodoTable/styledComponents";

const EmptyRowData = () => {
  return (
    <StyledTableRow>
      <StyledTableCell colSpan={6}>
        <NoData />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default EmptyRowData;
