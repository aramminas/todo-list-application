import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TodoType, TodoStatus } from "@/components/types";

interface TodoOverdueState {
  data: TodoType[];
}

const initialState: TodoOverdueState = {
  data: [],
};

const todoOverdueSlice = createSlice({
  name: "todoOverdue",
  initialState,
  reducers: {
    addToOverdue: (state, action: PayloadAction<TodoType>) => {
      const overdueData = { ...action.payload, updatedAt: new Date(), status: TodoStatus.Overdue };

      state.data = [...state.data, overdueData];
    },
  },
});

export const { addToOverdue } = todoOverdueSlice.actions;

export default todoOverdueSlice.reducer;
