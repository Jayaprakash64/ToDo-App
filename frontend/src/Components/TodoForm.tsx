import React, { useState } from "react";

interface TodoFormProps {
  onSubmit: (activity: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [activity, setActivity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activity.trim()) {
      onSubmit(activity.trim());
      setActivity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Enter your todo activity"
          maxLength={50}
          className="flex-1 px-4 py-2 bg-neutral-700/70 border border-neutral-500/50 
                 rounded-lg text-neutral-100 placeholder-neutral-400 backdrop-blur-md
                 focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold 
                 rounded-lg hover:from-amber-700 hover:to-amber-600 
                 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
