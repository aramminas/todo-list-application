import { fetcherPost, fetcherGet, fetcherPut, fetcherDelete } from "@/api";
import { TodoType } from "@/components/types";

const getTodos = (query?: string) => {
  return fetcherGet(`todos`, query);
};

const createTodo = (data: Omit<TodoType, "id">) => {
  return fetcherPost(`todos`, data);
};

const updateTodo = (data: TodoType) => {
  return fetcherPut(`todos`, data);
};

const deleteTodo = (id: string) => {
  return fetcherDelete(`todos`, id);
};

export { getTodos, createTodo, updateTodo, deleteTodo };
