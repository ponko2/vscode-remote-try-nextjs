"use client";

import { createTodo, toggleAllTodos } from "@/actions/todo";
import clsx from "clsx";
import { useRef } from "react";

type Props = {
  completedTodosCount: number;
  todosCount: number;
};

function CreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      action={async (formData) => {
        await createTodo(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <input
        className={clsx(
          "size-full",
          "py-4",
          "pl-14",
          "pr-4",
          "text-2xl",
          "shadow-inner",
          "placeholder:font-normal",
          "placeholder:italic",
          "placeholder:text-black/40",
          "focus:shadow",
          "focus:shadow-red-400",
          "focus:outline-none",
        )}
        name="title"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder="What needs to be done?"
        type="text"
      />
    </form>
  );
}

function ToggleForm({ checked }: { checked: boolean }) {
  return (
    <form action={toggleAllTodos}>
      <label>
        <input
          checked={checked}
          className={clsx("peer", "appearance-none")}
          onClick={(event) => {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }}
          readOnly
          type="checkbox"
        />
        <span
          className={clsx(
            "absolute",
            "left-0",
            "top-0",
            "flex",
            "h-full",
            "w-12",
            "items-center",
            "justify-center",
            "text-[0]",
            "before:inline-block",
            "before:rotate-90",
            "before:px-7",
            "before:py-2.5",
            "before:text-2xl",
            "before:text-neutral-400",
            "before:content-['❯']",
            "peer-checked:before:text-neutral-700",
            "peer-focus:shadow",
            "peer-focus:shadow-red-400",
            "peer-focus:outline-none",
          )}
        >
          Mark all as complete
        </span>
      </label>
    </form>
  );
}

export function TodoHeader({ completedTodosCount, todosCount }: Props) {
  return (
    <header className={clsx("relative", "mt-32", "h-16")}>
      <h1
        className={clsx(
          "absolute",
          "bottom-16",
          "w-full",
          "pb-6",
          "text-center",
          "text-7xl/none",
          "font-extralight",
          "text-red-700",
          "[text-rendering:optimizeLegibility]",
        )}
      >
        todos
      </h1>
      <CreateForm />
      {!!todosCount && (
        <ToggleForm checked={completedTodosCount === todosCount} />
      )}
    </header>
  );
}
