import { fetchTodos } from "@/actions/todos";
import { TodoHeader } from "@/components/TodoHeader";

export default async function Header() {
  const todos = await fetchTodos();
  const todosCount = todos.length;
  const completedTodosCount = todos.filter(({ completed }) => completed).length;
  return (
    <TodoHeader
      completedTodosCount={completedTodosCount}
      todosCount={todosCount}
    />
  );
}
