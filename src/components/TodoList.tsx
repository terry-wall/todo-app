'use client'

import { useState, useEffect } from 'react'
import { TodoItem } from './TodoItem'

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/todos')
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const updateTodo = async (id: string, updates: Partial<Pick<Todo, 'title' | 'completed'>>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      if (!response.ok) {
        throw new Error('Failed to update todo')
      }
      const updatedTodo = await response.json()
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo')
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    }
  }

  const handleTodoAdded = (newTodo: Todo) => {
    setTodos(prev => [newTodo, ...prev])
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Listen for custom events from AddTodoForm
  useEffect(() => {
    const handleTodoAddedEvent = (event: CustomEvent<Todo>) => {
      handleTodoAdded(event.detail)
    }

    window.addEventListener('todoAdded', handleTodoAddedEvent as EventListener)
    return () => {
      window.removeEventListener('todoAdded', handleTodoAddedEvent as EventListener)
    }
  }, [])

  if (loading) {
    return (
      <div className="mt-8">
        <div className="text-center text-gray-500">Loading todos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8">
        <div className="text-center text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={fetchTodos}
          className="block mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="mt-8">
      {todos.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No todos yet. Add one above!
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  )
}
