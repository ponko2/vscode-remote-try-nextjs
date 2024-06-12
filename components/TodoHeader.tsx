"use client";

import { createTodo, toggleAllTodos } from "@/actions/todo";
import { cn } from "@/lib/utils";
import { createTodoSchema } from "@/schemas/todo";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useEffect, useRef } from "react";

interface Props {
  completedTodosCount: number;
  todosCount: number;
}

function CreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createTodo, null);
  const [form, fields] = useForm({
    defaultValue: { title: "" },
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTodoSchema });
    },
  });
  useEffect(() => {
    if (!isPending && state?.status === "success") {
      formRef.current?.reset();
    }
  }, [isPending, state]);
  return (
    <form action={formAction} ref={formRef} {...getFormProps(form)}>
      <input
        className={cn(
          "size-full py-4 pl-14 pr-4 text-2xl shadow-inner",
          "placeholder:font-normal placeholder:italic placeholder:text-black/40",
          "focus:shadow focus:shadow-red-400 focus:outline-none",
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder="What needs to be done?"
        {...getInputProps(fields.title, { type: "text" })}
        key={fields.title.key}
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
            "absolute left-0 top-0 flex h-full w-12 items-center justify-center text-[0]",
            "before:inline-block before:rotate-90 before:px-7 before:py-2.5 before:text-2xl before:text-neutral-400 before:content-['❯']",
            "peer-checked:before:text-neutral-700",
            "peer-focus:shadow peer-focus:shadow-red-400 peer-focus:outline-none",
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
