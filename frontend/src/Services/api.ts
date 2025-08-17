import axios from "axios";
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from "../Types/todo";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const todoApi = {
  // GET /todos/
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>("/todos/");
    return response.data;
  },

  // POST /todos/
  createTodo: async (todoData: CreateTodoRequest): Promise<Todo> => {
    const response = await api.post<Todo>("/todos/", todoData);
    return response.data;
  },

  // PATCH /todos/{id}
  updateTodo: async (
    id: number,
    updateData: UpdateTodoRequest
  ): Promise<Todo> => {
    const response = await api.patch<Todo>(`/todos/${id}`, updateData);
    return response.data;
  },

  // DELETE /todos/{id}
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
