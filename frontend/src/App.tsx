import { useState, useEffect } from "react";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import { todoApi } from "./Services/api";
import type { Todo } from "./Types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const fetchedTodos = await todoApi.getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (activity: string) => {
    try {
      const newTodo = await todoApi.createTodo({ activity });
      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      await todoApi.updateTodo(id, { completed: !completed });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-800 text-neutral-100 py-8">
      <div className="max-w-md mx-auto bg-neutral-700 rounded-2xl shadow-lg border border-neutral-700 p-6">
        <h1 className="text-3xl font-bold text-amber-600 mb-6 ">Todo App</h1>

        <TodoForm onSubmit={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
