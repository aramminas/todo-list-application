import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";

interface TodoCompletedState {
  data: TodoType[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoCompletedState = {
  data: [],
  loading: false,
  error: null,
};

const todoCompletedSlice = createSlice({
  name: "todoCompleted",
  initialState,
  reducers: { _: () => {} },
  extraReducers: (builder: ActionReducerMapBuilder<TodoCompletedState>) => {
    //add
    builder
      .addCase(addToCompleted.pending, (state: TodoCompletedState) => {
        state.loading = true;
      })
      .addCase(
        addToCompleted.fulfilled,
        (state: TodoCompletedState, action: PayloadAction<TodoType>) => {
          const completedData = {
            ...action.payload,
            updatedAt: new Date(),
            status: TodoStatus.Completed,
          };

          state.loading = false;
          state.error = null;
          state.data = [...state.data, completedData];
        },
      )
      .addCase(addToCompleted.rejected, (state: TodoCompletedState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
  },
});

export const addToCompleted = createAsyncThunk("todo/addCompleted", async (todo: TodoType) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return todo;
});

export default todoCompletedSlice.reducer;
