import { fetchTodos } from "@/actions/todos";
import { TodoFooter } from "@/components/TodoFooter";

export default async function Footer() {
  const todos = await fetchTodos();
  const todosCount = todos.length;
  const completedTodosCount = todos.filter(({ completed }) => completed).length;
  return (
    <TodoFooter
      completedTodosCount={completedTodosCount}
      todosCount={todosCount}
    />
  );
}
