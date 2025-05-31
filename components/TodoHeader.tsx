"use client";

import { createTodo, toggleAllTodos } from "@/actions/todo";
import { cn } from "@/lib/utils";
import { createTodoSchema } from "@/schemas/todo";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useActionState, useRef } from "react";

interface Props {
  completedTodosCount: number;
  todosCount: number;
}

function CreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(createTodo, null);
  const [form, fields] = useForm({
    defaultValue: { title: "" },
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTodoSchema });
    },
  });
  return (
    <form {...getFormProps(form)} action={formAction} ref={formRef}>
      <input
        {...getInputProps(fields.title, { type: "text" })}
        className={cn(
          "size-full py-4 pr-4 pl-14 text-2xl shadow-inner",
          "placeholder:font-normal placeholder:text-black/40 placeholder:italic",
          "focus:shadow-sm focus:shadow-red-400 focus:outline-hidden",
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder="What needs to be done?"
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
          className="peer appearance-none"
          onClick={(event) => event.currentTarget.form?.requestSubmit()}
          readOnly
          type="checkbox"
        />
        <span
          className={cn(
            "absolute top-0 left-0 flex h-full w-12 items-center justify-center text-[0px]",
            "before:inline-block before:rotate-90 before:px-7 before:py-2.5 before:text-2xl before:text-neutral-400 before:content-['❯']",
            "peer-checked:before:text-neutral-700",
            "peer-focus:shadow-sm peer-focus:shadow-red-400 peer-focus:outline-hidden",
          )}
        >
          Mark all as complete
        </span>
      </label>
    </form>
  );
}

export default function TodoHeader({ completedTodosCount, todosCount }: Props) {
  return (
    <header className="relative mt-32 h-16">
      <h1 className="absolute bottom-16 w-full pb-6 text-center text-7xl/none font-extralight text-red-700 [text-rendering:optimizeLegibility]">
        todos
      </h1>
      <CreateForm />
      {!!todosCount && (
        <ToggleForm checked={completedTodosCount === todosCount} />
      )}
    </header>
  );
}
