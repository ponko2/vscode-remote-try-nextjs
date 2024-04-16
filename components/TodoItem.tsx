"use client";

import { deleteTodo, updateTodo } from "@/actions/todos";
import { TodoButton } from "@/components/TodoButton";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type Props = {
  todo: { id: string; title: string; completed: boolean };
};

function UpdateForm({
  todo,
  edit,
  onEditChange,
}: Props & { edit: boolean; onEditChange: (edit: boolean) => void }) {
  const [value, setValue] = useState(todo.title);
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (edit) {
      titleRef.current?.focus();
    }
  }, [edit]);
  return (
    <form
      action={async (formData) => {
        await updateTodo(formData);
        onEditChange(false);
      }}
    >
      <input name="id" type="hidden" value={todo.id} />
      <input
        name="completed"
        type="hidden"
        value={todo.completed ? "true" : "false"}
      />
      <input
        className={clsx(
          "size-full",
          "border",
          "border-neutral-400",
          "px-4",
          "py-3",
          "shadow-inner",
          "focus:shadow",
          "focus:shadow-red-400",
          "focus:outline-none",
        )}
        name="title"
        onBlur={(event) => {
          event.preventDefault();
          event.currentTarget.form?.requestSubmit();
        }}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        ref={titleRef}
        type="text"
        value={value}
      />
    </form>
  );
}

function ToggleForm({
  todo,
  onEditChange,
}: Props & { onEditChange: (edit: boolean) => void }) {
  return (
    <form action={updateTodo}>
      <input name="id" type="hidden" value={todo.id} />
      <input name="title" type="hidden" value={todo.title} />
      <input
        checked={todo.completed}
        className={clsx(
          "peer",
          "absolute",
          "inset-y-0",
          "my-auto",
          "size-12",
          "appearance-none",
          "outline-none",
        )}
        name="completed"
        onChange={(event) => {
          event.preventDefault();
          event.currentTarget.form?.requestSubmit();
        }}
        type="checkbox"
        value="true"
      />
      <label
        className={clsx(
          "block",
          "h-full",
          "break-words",
          "bg-unchecked",
          "bg-left",
          "bg-no-repeat",
          "py-4",
          "pl-14",
          "pr-4",
          "font-normal",
          "leading-tight",
          "text-neutral-700",
          "transition-colors",
          "duration-500",
          "peer-checked:bg-checked",
          "peer-checked:text-neutral-400",
          "peer-checked:line-through",
          "peer-focus:shadow",
          "peer-focus:shadow-red-400",
          "peer-focus:outline-none",
        )}
        onDoubleClick={() => onEditChange(true)}
      >
        {todo.title}
      </label>
    </form>
  );
}

function DeleteForm({ todo }: Props) {
  return (
    <form action={deleteTodo}>
      <input name="id" type="hidden" value={todo.id} />
      <TodoButton
        className={clsx(
          "absolute",
          "inset-y-0",
          "right-2.5",
          "my-auto",
          "hidden",
          "size-10",
          "text-3xl",
          "text-neutral-400",
          "transition-colors",
          "duration-200",
          "ease-out",
          "after:block",
          "after:h-full",
          "after:content-['×']",
          "hover:text-red-400",
          "focus:text-red-400",
          "group-hover:block",
        )}
        type="submit"
      />
    </form>
  );
}

export function TodoItem({ todo }: Props) {
  const [editing, setEditing] = useState(false);

  const list = cva(["relative", "text-2xl", "h-16"], {
    variants: {
      intent: {
        primary: ["group"],
        editing: ["pl-11"],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  });

  if (editing) {
    return (
      <li className={list({ intent: "editing" })}>
        <UpdateForm edit={editing} onEditChange={setEditing} todo={todo} />
      </li>
    );
  }
  return (
    <li className={list()}>
      <ToggleForm onEditChange={setEditing} todo={todo} />
      <DeleteForm todo={todo} />
    </li>
  );
}
