import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";
import { getTodos } from "@/api/requests";

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
  reducers: {
    setRemovedTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TodoRemovedState>) => {
    // get
    builder
      .addCase(getRemovedTodos.pending, (state: TodoRemovedState) => {
        state.loading = true;
      })
      .addCase(
        getRemovedTodos.fulfilled,
        (state: TodoRemovedState, action: PayloadAction<TodoType[]>) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(getRemovedTodos.rejected, (state: TodoRemovedState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
    // add
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

export const getRemovedTodos = createAsyncThunk(
  "todo/getRemoved",
  async (): Promise<TodoType[]> => {
    return await getTodos(`?status=${TodoStatus.Removed}`);
  },
);

export const addToRemoved = createAsyncThunk(
  "todo/addRemoved",
  async (todo: TodoType): Promise<TodoType> => todo,
);

export const { setRemovedTodos } = todoRemovedSlice.actions;
export default todoRemovedSlice.reducer;
