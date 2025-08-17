export interface Todo {
  id: number;
  activity: string;
  completed: boolean;
}

export interface CreateTodoRequest {
  activity: string;
}

export interface UpdateTodoRequest {
  completed: boolean;
}
