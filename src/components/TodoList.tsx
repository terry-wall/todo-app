"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  async function toggleTodo(id: string, completed: boolean) {
    setLoadingId(id);
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    } finally {
      setLoadingId(null);
    }
  }

  async function deleteTodo(id: string) {
    setLoadingId(id);
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setLoadingId(null);
    }
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">No todos yet</p>
        <p className="text-gray-400 text-sm">Add your first todo above to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
            todo.completed
              ? "bg-gray-50 border-gray-200"
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <button
            onClick={() => toggleTodo(todo.id, todo.completed)}
            disabled={loadingId === todo.id}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="flex-1">
            <p
              className={`${
                todo.completed
                  ? "text-gray-500 line-through"
                  : "text-gray-900"
              }`}
            >
              {todo.title}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(todo.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <button
            onClick={() => deleteTodo(todo.id)}
            disabled={loadingId === todo.id}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}