"use client";

import TodoItem from "@/components/TodoItem";

interface Props {
  todos: { id: string; title: string; completed: boolean }[];
}

export default function TodoList({ todos }: Props) {
  return (
    <section>
      <ul className="divide-y divide-neutral-200">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
