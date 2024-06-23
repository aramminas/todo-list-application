import { useState, ChangeEvent } from "react";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import StatusChip from "@/components/basic/StatusChip";
import EmptyRowData from "@/components/TodoTable/EmptyRowData";
import EllipsisTooltip from "@/components/basic/EllipsisTooltip";
import { StyledTableCell, StyledTableRow } from "@/components/TodoTable/styledComponents";
import { tableRowHeight, dateFormat } from "@/constants";
import { TodoType } from "@/components/types";

interface TodoTable {
  page: number;
  limit: number;
  rows: TodoType[] | [];
  setUrlParam: (param: string, value: string) => void;
  bgColor?: string;
}

const TodoTable = ({ page, limit, setUrlParam, rows, bgColor }: TodoTable) => {
  const [color] = useState(bgColor || "");
  const [currentPage, setCurrentPage] = useState(page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(limit || 10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
    setUrlParam("page", String(newPage));
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const limit = event.target.value;
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
    setUrlParam("limit", limit);
  };

  const emptyRows =
    currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ fontWeight: "bold" }}>
              <StyledTableCell bgcolor={color}>Title</StyledTableCell>
              <StyledTableCell align="right" bgcolor={color}>
                Description
              </StyledTableCell>
              <StyledTableCell align="right" bgcolor={color}>
                Deadline
              </StyledTableCell>
              <StyledTableCell align="right" bgcolor={color}>
                Status
              </StyledTableCell>
              <StyledTableCell align="right" bgcolor={color}>
                Options
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="right" scope="row">
                    <EllipsisTooltip text={row.description} width={"100%"} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.deadline ? dayjs(row.deadline).format(dateFormat) : "not specified"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <StatusChip status={row.status} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton aria-label="edit" size="large" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {!rows.length && <EmptyRowData />}
            {emptyRows > 0 && (
              <TableRow style={{ height: tableRowHeight * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TodoTable;
