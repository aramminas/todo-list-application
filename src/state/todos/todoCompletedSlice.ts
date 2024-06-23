import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";

interface TodoCompletedState {
  data: TodoType[];
}

const initialState: TodoCompletedState = {
  data: [],
};

const todoCompletedSlice = createSlice({
  name: "todoCompleted",
  initialState,
  reducers: {
    addToCompleted: (state, action: PayloadAction<TodoType>) => {
      const completedData = {
        ...action.payload,
        updatedAt: new Date(),
        status: TodoStatus.Completed,
      };

      state.data = [...state.data, completedData];
    },
  },
});

export const { addToCompleted } = todoCompletedSlice.actions;

export default todoCompletedSlice.reducer;
