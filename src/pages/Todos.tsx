import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import TodoTable from "@/components/TodoTable";
import PageWrapper from "@/components/PageWrapper";
import TodoFormDialog from "@/components/TodoFormDialog";
import { TodoType } from "@/components/types";

function Todos() {
  const location = useLocation();
  const [openForm, setOpenForm] = useState(false);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [, setSearchParams] = useSearchParams();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 20);
  const limit = parseInt(query.get("limit") || "10", 10);
  const offset = parseInt(query.get("offset") || "0", 0);

  const setUrlParam = (param: string, value: string) => {
    value && (value !== "0" || value !== "") ? query.set(param, value) : query.delete(param);

    setSearchParams(query);
  };

  const handleClickOpenFormDialog = () => {
    setOpenForm(true);
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
      <TodoTable page={page} limit={limit} rows={todos} setUrlParam={setUrlParam} />
      <TodoFormDialog open={openForm} setOpen={setOpenForm} setTodos={setTodos} />
    </PageWrapper>
  );
}

export default Todos;
