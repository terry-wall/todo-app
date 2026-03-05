import { TodoList } from '@/components/TodoList'
import { AddTodoForm } from '@/components/AddTodoForm'

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <AddTodoForm />
      <TodoList />
    </div>
  )
}
