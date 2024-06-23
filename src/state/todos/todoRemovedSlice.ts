import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";

interface TodoRemovedState {
  data: TodoType[];
}

const initialState: TodoRemovedState = {
  data: [],
};

const todoRemovedSlice = createSlice({
  name: "todoRemoved",
  initialState,
  reducers: {
    addToRemoved: (state, action: PayloadAction<TodoType>) => {
      const removedData = { ...action.payload, updatedAt: new Date(), status: TodoStatus.Removed };

      state.data = [...state.data, removedData];
    },
  },
});

export const { addToRemoved } = todoRemovedSlice.actions;

export default todoRemovedSlice.reducer;
