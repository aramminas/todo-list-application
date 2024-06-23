import { forwardRef, useMemo, useEffect } from "react";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import FormDatePicker from "@/components/TodoFormDialog/components/FormDatePicker";
import { TodoType, TodoStatus, TodoDataType, resetInitialData } from "@/components/types";
import { addTodo, updateTodo } from "@/state/todos/todoPendingSlice";

const schema = yup.object().shape({
  title: yup.string().min(2).max(60).required(),
  description: yup.string().matches(/^(|.{4,})$/, "description must be at least 4 characters"),
  deadline: yup
    .date()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(),
});

interface TodoFormProps {
  open: boolean;
  todo: TodoType | null;
  onClose: () => void;
}

const TodoForm = forwardRef(({ todo, onClose, open }: TodoFormProps, ref) => {
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        title: todo?.title,
        description: todo?.description,
        deadline: todo?.deadline,
      };
    }, [todo]),
  });

  useEffect(() => {
    if (!open) {
      reset(resetInitialData);
    }

    if (todo) {
      reset(todo);
    }
  }, [todo, open]);

  const onSubmitHandler = (data: TodoDataType) => {
    // edit
    if (todo?.id) {
      const updateTodoData: TodoType = {
        ...todo,
        ...data,
        updatedAt: new Date(),
      };

      dispatch(updateTodo(updateTodoData));
      onClose();
      return;
    }

    // create
    const newTodoData: TodoType = {
      ...data,
      id: uuidv4(),
      updatedAt: new Date(),
      createdAt: new Date(),
      status: TodoStatus.Pending,
    };

    dispatch(addTodo(newTodoData));
    onClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="form" ref={ref} noValidate onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              autoFocus
              name="title"
              label="Title"
              error={!!errors?.title?.message}
              helperText={!!errors?.title?.message && errors?.title?.message}
              {...register("title")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              rows={4}
              multiline
              fullWidth
              name="description"
              label="Description"
              error={!!errors?.description?.message}
              helperText={!!errors?.description?.message && errors?.description?.message}
              {...register("description")}
            />
          </Grid>
          <Grid item xs={12}>
            <FormDatePicker
              name="deadline"
              control={control}
              disablePast={true}
              error={!!errors?.deadline?.message}
              helperText={!!errors?.deadline?.message && errors?.deadline?.message}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export default TodoForm;
