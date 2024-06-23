import { forwardRef } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import FormDatePicker from "@/components/TodoFormDialog/components/FormDatePicker";
import { TodoType, TodoStatus } from "@/components/types";

const schema = yup.object().shape({
  title: yup.string().min(2).max(60).required(),
  description: yup.string().matches(/^(|.{4,})$/, "description must be at least 4 characters"),
  deadline: yup
    .date()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(),
});

interface TodoFormProps {
  setTodos: (value: ((prevState: TodoType[]) => TodoType[]) | TodoType[]) => void;
}

const TodoForm = forwardRef(({ setTodos }: TodoFormProps, ref) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    setTodos((prevState) => {
      data.id = `${Math.random()}-${Math.random()}-${Math.random()}`;
      data.updatedAt = new Date();
      data.createdAt = new Date();
      data.status = TodoStatus.Pending;

      return [...prevState, data];
    });
    reset();
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
