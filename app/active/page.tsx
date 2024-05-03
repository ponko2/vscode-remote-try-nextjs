import { fetchTodos } from "@/actions/todo";
import TodoPage from "@/components/TodoPage";

export default async function Active() {
  const todos = await fetchTodos();
  return <TodoPage todos={todos} type="active" />;
}
