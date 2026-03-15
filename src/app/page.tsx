import { prisma } from "@/lib/prisma";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo App</h1>
        <p className="text-gray-600">Stay organized and get things done</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <TodoForm />
        <TodoList todos={todos} />
      </div>
    </main>
  );
}