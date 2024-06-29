import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";
import { getTodos } from "@/api/requests";

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
  reducers: {
    setCompletedTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TodoCompletedState>) => {
    // get
    builder
      .addCase(getCompletedTodos.pending, (state: TodoCompletedState) => {
        state.loading = true;
      })
      .addCase(
        getCompletedTodos.fulfilled,
        (state: TodoCompletedState, action: PayloadAction<TodoType[]>) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(getCompletedTodos.rejected, (state: TodoCompletedState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
    // add
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

export const getCompletedTodos = createAsyncThunk(
  "todo/getCompleted",
  async (): Promise<TodoType[]> => {
    return await getTodos(`?status=${TodoStatus.Completed}`);
  },
);

export const addToCompleted = createAsyncThunk("todo/addCompleted", async (todo: TodoType) => todo);

export const { setCompletedTodos } = todoCompletedSlice.actions;
export default todoCompletedSlice.reducer;
