import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import { RootState, AppDispatch } from "@/state/store";
import TodoFormDialog from "@/components/TodoFormDialog";
import { TodoType, TodoStatus } from "@/components/types";
import { addToOverdue } from "@/state/todos/todoOverdueSlice";
import AlertLoadingWrapper from "@/components/basic/AlertLoadingWrapper";
import { removePendingTodo, getPendingTodos } from "@/state/todos/todoPendingSlice";

function Todos() {
  const dispatch = useDispatch<AppDispatch>();
  const [openForm, setOpenForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const { data: todos, error, loading } = useSelector((state: RootState) => state.todoPending);

  useEffect(() => {
    dispatch(getPendingTodos());
  }, []);

  useEffect(() => {
    ((todos) => {
      todos.forEach((todo) => {
        if (todo.deadline) {
          // check and automatically move overdue tasks to the overdue section
          if (new Date(todo.deadline).getTime() < new Date().getTime()) {
            dispatch(addToOverdue(todo));
            dispatch(removePendingTodo({ todo: todo, status: TodoStatus.Overdue }));
          }
        }
      });
    })(todos);
  }, []);

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
      <AlertLoadingWrapper message={error} loading={loading} />
      <TodoTable
        rows={todos}
        loading={loading}
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
