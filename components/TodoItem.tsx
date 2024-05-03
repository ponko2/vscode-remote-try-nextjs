"use client";

import { deleteTodo, updateTodo } from "@/actions/todo";
import TodoButton from "@/components/TodoButton";
import { cn } from "@/lib/utils";
import { deleteTodoSchema, updateTodoSchema } from "@/schemas/todo";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  todo: { id: string; title: string; completed: boolean };
};

function TitleInput({
  onEditChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  onEditChange: (edit: boolean) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();
  useEffect(() => {
    if (!pending) {
      ref.current?.focus();
    }
  }, [pending]);
  useEffect(() => {
    if (pending) {
      onEditChange(false);
    }
  }, [pending, onEditChange]);
  return (
    <input
      className={cn(
        "size-full border border-neutral-400 px-4 py-3 shadow-inner",
        "focus:shadow focus:shadow-red-400 focus:outline-none",
      )}
      onBlur={(event) => {
        event.preventDefault();
        event.currentTarget.form?.requestSubmit();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.form?.requestSubmit();
        }
      }}
      ref={ref}
      {...props}
    />
  );
}

function UpdateForm({
  todo,
  onEditChange,
}: Props & { onEditChange: (edit: boolean) => void }) {
  const [lastResult, action] = useFormState(updateTodo, null);
  const [form, fields] = useForm({
    defaultValue: { title: todo.title },
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateTodoSchema });
    },
  });
  return (
    <form action={action} {...getFormProps(form)}>
      <input
        value={todo.id}
        {...getInputProps(fields.id, { type: "hidden", value: false })}
        key={fields.id.key}
      />
      {todo.completed ? (
        <input
          value="on"
          {...getInputProps(fields.completed, { type: "hidden", value: false })}
          key={fields.completed.key}
        />
      ) : null}
      <TitleInput
        onEditChange={onEditChange}
        {...getInputProps(fields.title, { type: "text" })}
        key={fields.title.key}
      />
    </form>
  );
}

function ToggleForm({
  todo,
  onEditChange,
}: Props & { onEditChange: (edit: boolean) => void }) {
  const [lastResult, action] = useFormState(updateTodo, null);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateTodoSchema });
    },
  });
  return (
    <form action={action} {...getFormProps(form)}>
      <input
        value={todo.id}
        {...getInputProps(fields.id, { type: "hidden", value: false })}
        key={fields.id.key}
      />
      <input
        value={todo.title}
        {...getInputProps(fields.title, { type: "hidden", value: false })}
        key={fields.title.key}
      />
      <input
        checked={todo.completed}
        className="peer absolute inset-y-0 my-auto size-12 appearance-none outline-none"
        onChange={(event) => {
          event.preventDefault();
          event.currentTarget.form?.requestSubmit();
        }}
        {...getInputProps(fields.completed, { type: "checkbox", value: false })}
        key={fields.completed.key}
      />
      <label
        className={cn(
          "block h-full break-words bg-unchecked bg-left bg-no-repeat py-4 pl-14 pr-4 font-normal leading-tight text-neutral-700 transition-colors duration-500",
          "peer-checked:bg-checked peer-checked:text-neutral-400 peer-checked:line-through",
          "peer-focus:shadow peer-focus:shadow-red-400 peer-focus:outline-none",
        )}
        onDoubleClick={() => onEditChange(true)}
      >
        {todo.title}
      </label>
    </form>
  );
}

function DeleteForm({ todo }: Props) {
  const [lastResult, action] = useFormState(deleteTodo, null);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: deleteTodoSchema });
    },
  });
  return (
    <form action={action} {...getFormProps(form)}>
      <input
        value={todo.id}
        {...getInputProps(fields.id, { type: "hidden", value: false })}
        key={fields.id.key}
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
