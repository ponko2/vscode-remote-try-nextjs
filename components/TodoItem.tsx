"use client";

import { deleteTodo, updateTodo } from "@/actions/todo";
import TodoButton from "@/components/TodoButton";
import { cn } from "@/lib/utils";
import { deleteTodoSchema, updateTodoSchema } from "@/schemas/todo";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { cva } from "class-variance-authority";
import { useActionState, useRef, useState } from "react";

interface Props {
  todo: { id: string; title: string; completed: boolean };
}

function UpdateForm({
  todo,
  onEditChange,
}: Props & { onEditChange: (edit: boolean) => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(updateTodo, null);
  const [form, fields] = useForm({
    defaultValue: { ...todo, completed: todo.completed ? "on" : null },
    lastResult: state,
    onSubmit() {
      onEditChange(false);
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateTodoSchema });
    },
  });
  return (
    <form {...getFormProps(form)} action={formAction} ref={formRef}>
      <input
        {...getInputProps(fields.id, { type: "hidden", value: false })}
        value={todo.id}
      />
      {todo.completed ? (
        <input
          {...getInputProps(fields.completed, { type: "hidden", value: false })}
          value="on"
        />
      ) : null}
      <input
        {...getInputProps(fields.title, { type: "text" })}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className={cn(
          "size-full border border-neutral-400 px-4 py-3 shadow-inner",
          "focus:shadow-sm focus:shadow-red-400 focus:outline-hidden",
        )}
        onBlur={(event) => event.currentTarget.form?.requestSubmit()}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
      />
    </form>
  );
}

function ToggleForm({
  todo,
  onEditChange,
}: Props & { onEditChange: (edit: boolean) => void }) {
  const [state, formAction] = useActionState(updateTodo, null);
  const [form, fields] = useForm({
    defaultValue: { ...todo, completed: todo.completed ? "on" : null },
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateTodoSchema });
    },
  });
  return (
    <form {...getFormProps(form)} action={formAction}>
      <input
        {...getInputProps(fields.id, { type: "hidden", value: false })}
        value={todo.id}
      />
      <input
        {...getInputProps(fields.title, { type: "hidden", value: false })}
        value={todo.title}
      />
      <input
        {...getInputProps(fields.completed, { type: "checkbox", value: false })}
        checked={todo.completed}
        className="peer absolute inset-y-0 my-auto size-12 appearance-none outline-hidden"
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      />
      <label
        className={cn(
          "bg-unchecked block h-full bg-left bg-no-repeat py-4 pr-4 pl-14 leading-tight font-normal wrap-break-word text-neutral-700 transition-colors duration-500",
          "peer-checked:bg-checked peer-checked:text-neutral-400 peer-checked:line-through",
          "peer-focus:shadow-sm peer-focus:shadow-red-400 peer-focus:outline-hidden",
        )}
        onDoubleClick={() => onEditChange(true)}
      >
        {todo.title}
      </label>
    </form>
  );
}

function DeleteForm({ todo }: Props) {
  const [state, formAction] = useActionState(deleteTodo, null);
  const [form, fields] = useForm({
    defaultValue: todo,
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: deleteTodoSchema });
    },
  });
  return (
    <form {...getFormProps(form)} action={formAction}>
      <input
        {...getInputProps(fields.id, { type: "hidden", value: false })}
        value={todo.id}
      />
      <TodoButton
        className={cn(
          "absolute inset-y-0 right-2.5 my-auto hidden size-10 text-3xl text-neutral-400 transition-colors duration-200 ease-out",
          "after:block after:h-full after:content-['×']",
          "hover:text-red-400",
          "focus:text-red-400",
          "group-hover:block",
        )}
        type="submit"
      />
    </form>
  );
}

export default function TodoItem({ todo }: Props) {
  const [editing, setEditing] = useState(false);

  const list = cva("relative h-16 text-2xl", {
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
        <UpdateForm onEditChange={setEditing} todo={todo} />
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
