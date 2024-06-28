import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import MainTitle from "@/components/basic/MainTitle";
import TodoForm from "@/components/TodoFormDialog/components/TodoForm";
import DialogTransition from "@/components/TodoFormDialog/components/DialogTransition";
import { TodoType } from "@/components/types";

interface TodoFormDialogProps {
  open: boolean;
  todo: TodoType | null;
  handleClose: () => void;
}

const TodoFormDialog = ({ open, handleClose, todo }: TodoFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>();

  const handleCreateTodo = () => {
    formRef?.current?.requestSubmit();
  };

  return (
    <Dialog
      open={open}
      keepMounted
      TransitionComponent={DialogTransition}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>
        <MainTitle text="Create new Todo" variant="caption" fontSize={20} />
      </DialogTitle>
      <DialogContent dividers>
        <TodoForm ref={formRef} open={open} todo={todo} onClose={handleClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleCreateTodo}>{!!todo ? "Edit" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoFormDialog;
