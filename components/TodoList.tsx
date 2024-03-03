"use client";

import { TodoItem } from "@/components/TodoItem";
import clsx from "clsx";

type Props = {
  todos: { id: string; title: string; completed: boolean }[];
};

export function TodoList({ todos }: Props) {
  return (
    <section>
      <ul className={clsx("divide-y", "divide-neutral-200")}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
