import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TodoType } from "@/components/types";

interface TodoPendingState {
  data: TodoType[];
}

const initialState: TodoPendingState = {
  data: [],
};

const todoPendingSlice = createSlice({
  name: "todoPending",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.data = [...state.data, action.payload];
    },
    updateTodo: (state, action: PayloadAction<TodoType>) => {
      state.data = state.data.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }

        return todo;
      });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, removeTodo } = todoPendingSlice.actions;

export default todoPendingSlice.reducer;
