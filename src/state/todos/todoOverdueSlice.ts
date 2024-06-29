import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";
import { getTodos } from "@/api/requests";

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
  reducers: {
    setOverdueTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TodoOverdueState>) => {
    // get
    builder
      .addCase(getOverdueTodos.pending, (state: TodoOverdueState) => {
        state.loading = true;
      })
      .addCase(
        getOverdueTodos.fulfilled,
        (state: TodoOverdueState, action: PayloadAction<TodoType[]>) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        },
      )
      .addCase(getOverdueTodos.rejected, (state: TodoOverdueState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
    // add
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

export const getOverdueTodos = createAsyncThunk(
  "todo/getOverdue",
  async (): Promise<TodoType[]> => {
    return await getTodos(`?status=${TodoStatus.Overdue}`);
  },
);

export const addToOverdue = createAsyncThunk("todo/addOverdue", async (todo: TodoType) => todo);

export const { setOverdueTodos } = todoOverdueSlice.actions;
export default todoOverdueSlice.reducer;
