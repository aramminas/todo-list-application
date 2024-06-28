import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";

interface TodoOverdueState {
  data: TodoType[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoOverdueState = {
  data: [],
  loading: false,
  error: null,
};

const todoOverdueSlice = createSlice({
  name: "todoOverdue",
  initialState,
  reducers: { _: () => {} },
  extraReducers: (builder: ActionReducerMapBuilder<TodoOverdueState>) => {
    //add
    builder
      .addCase(addToOverdue.pending, (state: TodoOverdueState) => {
        state.loading = true;
      })
      .addCase(
        addToOverdue.fulfilled,
        (state: TodoOverdueState, action: PayloadAction<TodoType>) => {
          const overdueData = {
            ...action.payload,
            updatedAt: new Date(),
            status: TodoStatus.Overdue,
          };

          state.loading = false;
          state.error = null;
          state.data = [...state.data, overdueData];
        },
      )
      .addCase(addToOverdue.rejected, (state: TodoOverdueState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
  },
});

export const addToOverdue = createAsyncThunk("todo/addOverdue", async (todo: TodoType) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return todo;
});

export default todoOverdueSlice.reducer;
