import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";
import { getTodos, createTodo, updateTodo } from "@/api/requests";

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
  reducers: {
    setPendingTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TodoPendingState>) => {
    // get
    builder
      .addCase(getPendingTodos.pending, (state: TodoPendingState) => {
        state.loading = true;
      })
      .addCase(
        getPendingTodos.fulfilled,
        (state: TodoPendingState, action: PayloadAction<TodoType[] | []>) => {
          state.loading = false;
          state.error = null;
          state.data = action?.payload || [];
        },
      )
      .addCase(getPendingTodos.rejected, (state: TodoPendingState, action) => {
        state.loading = false;
        state.error = action?.error?.message || "";
      });
    // add
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

export const getPendingTodos = createAsyncThunk(
  "todo/getPending",
  async (): Promise<TodoType[]> => {
    return await getTodos(`?status=${TodoStatus.Pending}`);
  },
);

export const addPendingTodo = createAsyncThunk(
  "todo/addPending",
  async (todo: Omit<TodoType, "id">): Promise<TodoType> => {
    return await createTodo(todo);
  },
);

export const updatePendingTodo = createAsyncThunk(
  "todo/updatePending",
  async (todo: TodoType): Promise<TodoType> => {
    return await updateTodo(todo);
  },
);

export const removePendingTodo = createAsyncThunk(
  "todo/removePending",
  async ({ todo, status }: { todo: TodoType; status: TodoStatus }): Promise<string> => {
    const removedTodo: TodoType = { ...todo, status };
    await updateTodo(removedTodo);

    return removedTodo.id;
  },
);

export const { setPendingTodos } = todoPendingSlice.actions;
export default todoPendingSlice.reducer;
