import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import TodoFormDialog from "@/components/TodoFormDialog";
import { TodoType, TodoStatus } from "@/components/types";
import { removeTodo } from "@/state/todos/todoPendingSlice";
import { addToOverdue } from "@/state/todos/todoOverdueSlice";
import { RootState } from "@/state/store";

function Todos() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [openForm, setOpenForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const [, setSearchParams] = useSearchParams();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 20);
  const limit = parseInt(query.get("limit") || "10", 10);

  const todos = useSelector((state: RootState) => state.todoPending.data);

  useEffect(() => {
    (() => {
      todos.forEach((todo) => {
        if (todo.deadline) {
          // check and automatically move overdue tasks to the overdue section
          if (new Date(todo.deadline) < new Date()) {
            dispatch(addToOverdue(todo));
            dispatch(removeTodo(todo.id));
          }
        }
      });
    })(todos);
  }, []);

  const setUrlParam = (param: string, value: string) => {
    value && (value !== "0" || value !== "") ? query.set(param, value) : query.delete(param);

    setSearchParams(query);
  };

  const handleClickOpenFormDialog = () => {
    setOpenForm(true);
  };

  const handleClickCloseFormDialog = () => {
    setOpenForm(false);
    if (selectedTodo) {
      setSelectedTodo(null);
    }
  };

  const handleOpenEditDialog = (id: string) => () => {
    const currentTodo = todos.find((todo) => todo.id === id);

    if (currentTodo) {
      setSelectedTodo(currentTodo);
      handleClickOpenFormDialog();
    }
  };

  return (
    <PageWrapper
      title="Todo list"
      actionButton={
        <Button variant="contained" onClick={handleClickOpenFormDialog} startIcon={<AddIcon />}>
          Add Todo
        </Button>
      }
    >
      <TodoTable
        page={page}
        limit={limit}
        rows={todos}
        setUrlParam={setUrlParam}
        handleEdit={handleOpenEditDialog}
        pageStatus={TodoStatus.Pending}
      />
      <TodoFormDialog
        open={openForm}
        handleClose={handleClickCloseFormDialog}
        todo={selectedTodo}
      />
    </PageWrapper>
  );
}

export default Todos;
