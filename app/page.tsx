import { fetchTodos } from "@/actions/todo";
import TodoPage from "@/components/TodoPage";

export default async function Home() {
  const todos = await fetchTodos();
  return <TodoPage todos={todos} type="all" />;
}
