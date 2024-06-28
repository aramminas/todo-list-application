import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";

interface TodoRemovedState {
  data: TodoType[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoRemovedState = {
  data: [],
  loading: false,
  error: null,
};

const todoRemovedSlice = createSlice({
  name: "todoRemoved",
  initialState,
  reducers: { _: () => {} },
  extraReducers: (builder: ActionReducerMapBuilder<TodoRemovedState>) => {
    //add
    builder
      .addCase(addToRemoved.pending, (state: TodoRemovedState) => {
        state.loading = true;
      })
      .addCase(
        addToRemoved.fulfilled,
        (state: TodoRemovedState, action: PayloadAction<TodoType>) => {
          const removedData = {
            ...action.payload,
            updatedAt: new Date(),
            status: TodoStatus.Removed,
          };

          state.loading = false;
          state.error = null;
          state.data = [...state.data, removedData];
        },
      )
      .addCase(addToRemoved.rejected, (state: TodoRemovedState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
  },
});

export const addToRemoved = createAsyncThunk("todo/addRemoved", async (todo: TodoType) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return todo;
});

export default todoRemovedSlice.reducer;
