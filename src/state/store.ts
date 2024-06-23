import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import todoPendingReducer from "@/state/todos/todoPendingSlice";
import todoCompletedReducer from "@/state/todos/todoCompletedSlice";
import todoOverdueReducer from "@/state/todos/todoOverdueSlice";
import todoRemovedReducer from "@/state/todos/todoRemovedSlice";

export const store = configureStore({
  reducer: {
    todoPending: todoPendingReducer,
    todoCompleted: todoCompletedReducer,
    todoOverdue: todoOverdueReducer,
    todoRemoved: todoRemovedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
