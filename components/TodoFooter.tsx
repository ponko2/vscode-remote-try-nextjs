"use client";

import { deleteCompletedTodos } from "@/actions/todo";
import TodoButton from "@/components/TodoButton";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  completedTodosCount: number;
  todosCount: number;
}

function CompletedForm() {
  return (
    <form action={deleteCompletedTodos} className="text-right">
      <TodoButton
        className="cursor-pointer no-underline hover:underline active:no-underline"
        type="submit"
      >
        Clear completed
      </TodoButton>
    </form>
  );
}

export default function TodoFooter({ completedTodosCount, todosCount }: Props) {
  const pathname = usePathname();

  if (todosCount <= 0) {
    return null;
  }

  const activeCount = todosCount - completedTodosCount;

  const link = cva(
    "m-1 rounded-sm border px-2 py-1 no-underline hover:border-red-400",
    {
      variants: {
        intent: {
          active: ["border-red-700"],
          inactive: ["border-transparent"],
        },
      },
    },
  );

  return (
    <footer className="isolate grid grid-cols-2 gap-2 px-4 py-2.5 sm:grid-cols-3">
      <span>
        <strong className="font-light">{activeCount ?? "No"}</strong>{" "}
        {activeCount === 1 ? "item" : "items"} left
      </span>
      <ul className="order-last col-span-full text-center sm:order-0 sm:col-auto">
        {[
          { href: "/", text: "All" },
          { href: "/active", text: "Active" },
          { href: "/completed", text: "Completed" },
        ].map(({ href, text }) => (
          <li className="inline" key={href}>
            <Link
              className={
                pathname === href
                  ? link({ intent: "active" })
                  : link({ intent: "inactive" })
              }
              href={href}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
      {!!completedTodosCount && <CompletedForm />}
    </footer>
  );
}
