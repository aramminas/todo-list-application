import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { TodoType } from "@/components/types";

interface TodoPendingState {
  data: TodoType[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoPendingState = {
  data: [],
  loading: false,
  error: null,
};

const todoPendingSlice = createSlice({
  name: "todoPending",
  initialState,
  reducers: { _: () => {} },
  extraReducers: (builder: ActionReducerMapBuilder<TodoPendingState>) => {
    //add
    builder
      .addCase(addPendingTodo.pending, (state: TodoPendingState) => {
        state.loading = true;
      })
      .addCase(
        addPendingTodo.fulfilled,
        (state: TodoPendingState, action: PayloadAction<TodoType>) => {
          state.loading = false;
          state.error = null;
          state.data = [...state.data, action.payload];
        },
      )
      .addCase(addPendingTodo.rejected, (state: TodoPendingState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
    // update
    builder
      .addCase(updatePendingTodo.pending, (state: TodoPendingState) => {
        state.loading = true;
      })
      .addCase(
        updatePendingTodo.fulfilled,
        (state: TodoPendingState, action: PayloadAction<TodoType>) => {
          state.loading = false;
          state.error = null;
          state.data = state.data.map((todo) => {
            if (todo.id === action.payload.id) {
              return action.payload;
            }

            return todo;
          });
        },
      )
      .addCase(updatePendingTodo.rejected, (state: TodoPendingState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
    // remove
    builder
      .addCase(removePendingTodo.pending, (state: TodoPendingState) => {
        state.loading = true;
      })
      .addCase(
        removePendingTodo.fulfilled,
        (state: TodoPendingState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = null;
          state.data = state.data.filter((todo) => todo.id !== action.payload);
        },
      )
      .addCase(removePendingTodo.rejected, (state: TodoPendingState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
  },
});

export const addPendingTodo = createAsyncThunk("todo/addPending", async (todo: TodoType) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return todo;
});

export const updatePendingTodo = createAsyncThunk("todo/updatePending", async (todo: TodoType) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return todo;
});

export const removePendingTodo = createAsyncThunk("todo/removePending", async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return id;
});

export default todoPendingSlice.reducer;
