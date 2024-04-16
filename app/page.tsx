import { fetchTodos } from "@/actions/todo";
import { TodoList } from "@/components/TodoList";

export default async function Home() {
  const todos = await fetchTodos();
  return <TodoList todos={todos} />;
}
