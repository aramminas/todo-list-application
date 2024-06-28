import { useState, ChangeEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { AppDispatch } from "@/state/store";
import StatusChip from "@/components/basic/StatusChip";
import { tableRowHeight, dateFormat } from "@/constants";
import { TodoType, TodoStatus } from "@/components/types";
import { addToRemoved } from "@/state/todos/todoRemovedSlice";
import EmptyRowData from "@/components/TodoTable/EmptyRowData";
import EllipsisTooltip from "@/components/basic/EllipsisTooltip";
import { addToCompleted } from "@/state/todos/todoCompletedSlice";
import { removePendingTodo } from "@/state/todos/todoPendingSlice";
import { StyledTableCell, StyledTableRow } from "@/components/TodoTable/styledComponents";

interface TodoTable {
  rows: TodoType[];
  bgColor?: string;
  loading?: boolean;
  handleEdit?: (id: string) => () => void;
  pageStatus?: TodoStatus;
}

const TodoTable = ({ rows, bgColor, loading, handleEdit, pageStatus }: TodoTable) => {
  const dispatch = useDispatch<AppDispatch>();
  const [color] = useState(bgColor || "");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const handleDeleteTodo = (id: string) => () => {
    const findRemovedTodo = rows.find((todo) => todo.id === id);
    if (findRemovedTodo) {
      dispatch(addToRemoved(findRemovedTodo));
    }
    dispatch(removePendingTodo(id));
  };

  const handleCompleted = (
    event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if ("checked" in event?.target && event?.target?.checked) {
      const findCompletedTodo = rows.find((todo) => todo.id === id);
      if (findCompletedTodo) {
        dispatch(addToCompleted(findCompletedTodo));
      }
      dispatch(removePendingTodo(id));
    }
  };

  const emptyRows =
    currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ fontWeight: "bold" }}>
              {pageStatus === TodoStatus.Pending && !!rows.length && (
                <StyledTableCell color={color} />
              )}
              <StyledTableCell color={color}>Title</StyledTableCell>
              <StyledTableCell align="right" color={color}>
                Description
              </StyledTableCell>
              <StyledTableCell align="right" color={color}>
                Deadline
              </StyledTableCell>
              <StyledTableCell align="right" color={color}>
                Status
              </StyledTableCell>
              {pageStatus === TodoStatus.Pending && (
                <StyledTableCell align="right" color={color}>
                  Options
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  {pageStatus === TodoStatus.Pending ? (
                    <>
                      <StyledTableCell component="th" scope="row">
                        <Checkbox
                          color="success"
                          disabled={loading}
                          onClick={(ev) => handleCompleted(ev, row.id)}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.title}</StyledTableCell>
                    </>
                  ) : (
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="right" scope="row">
                    <EllipsisTooltip text={row.description} width={"100%"} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.deadline ? dayjs(row.deadline).format(dateFormat) : "not specified"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <StatusChip status={row.status} />
                  </StyledTableCell>
                  {pageStatus === TodoStatus.Pending && (
                    <StyledTableCell align="right">
                      <IconButton
                        onClick={handleEdit?.(row.id)}
                        aria-label="edit"
                        size="small"
                        color="primary"
                        disabled={loading}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleDeleteTodo(row.id)}
                        aria-label="delete"
                        size="small"
                        color="error"
                        disabled={loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  )}
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
