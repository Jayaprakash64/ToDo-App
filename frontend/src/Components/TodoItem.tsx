import React from "react";
import type { Todo } from "../Types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />

      <span
        className={`flex-1 ${
          todo.completed ? "line-through text-gray-500" : "text-gray-800"
        }`}
      >
        {todo.activity}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="px-2 py-1 text-red-600 hover:bg-red-100 rounded text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
