import { forwardRef, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { AppDispatch } from "@/state/store";
import FormDatePicker from "@/components/TodoFormDialog/components/FormDatePicker";
import { TodoType, TodoStatus, resetInitialData, PartialTodoDataType } from "@/components/types";
import { addPendingTodo, updatePendingTodo } from "@/state/todos/todoPendingSlice";

const schema = yup.object().shape({
  title: yup.string().min(2).max(60).required(),
  description: yup.string().matches(/^(|.{4,})$/, "description must be at least 4 characters"),
  deadline: yup.date().transform((curr, orig) => (orig === "" ? null : curr)),
});

interface TodoFormProps {
  open: boolean;
  todo: TodoType | null;
  onClose: () => void;
}

const TodoForm = forwardRef(({ todo, onClose, open }: TodoFormProps, ref) => {
  const dispatch = useDispatch<AppDispatch>();

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
        title: todo?.title || "",
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

  const onSubmitHandler = (data: PartialTodoDataType) => {
    // convert date to end of day
    const endOfDay: Date | undefined = data.deadline
      ? dayjs(data.deadline).endOf("day").toDate()
      : undefined;

    // edit
    if (todo?.id) {
      const updateTodoData: TodoType = {
        ...todo,
        ...data,
        deadline: endOfDay,
        updatedAt: new Date(),
      };

      dispatch(updatePendingTodo(updateTodoData));
      onClose();
      return;
    }

    // create
    const newTodoData: Omit<TodoType, "id"> = {
      ...data,
      deadline: endOfDay,
      updatedAt: new Date(),
      createdAt: new Date(),
      status: TodoStatus.Pending,
      description: data.description || "",
    };

    dispatch(addPendingTodo(newTodoData));
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
              helperText={!!errors?.deadline?.message ? errors?.deadline?.message : ""}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export default TodoForm;
