"use server";

import prisma from "@/actions/database";
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "@/schemas/todo";
import { parseWithZod } from "@conform-to/zod";
import { unstable_noStore as noStore, revalidateTag } from "next/cache";

export async function fetchTodos() {
  noStore();
  return prisma.todo.findMany();
}

export async function createTodo(_state: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: createTodoSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.todo.create({ data: submission.value });
  revalidateTag("todos");
  return submission.reply();
}

export async function deleteTodo(_state: unknown, payload: FormData) {
  const submission = parseWithZod(payload, { schema: deleteTodoSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.todo.delete({ where: { id: submission.value.id } });
  revalidateTag("todos");
  return submission.reply();
}

export async function updateTodo(_state: unknown, payload: FormData) {
  const submission = parseWithZod(payload, { schema: updateTodoSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const { id, title, completed } = submission.value;
  if (title) {
    await prisma.todo.update({
      where: { id },
      data: { title, completed },
    });
  } else {
    await prisma.todo.delete({ where: { id } });
  }
  revalidateTag("todos");
  return submission.reply();
}

export async function toggleAllTodos() {
  const todos = await fetchTodos();
  const completed = !todos.every((todo) => todo.completed);
  await prisma.todo.updateMany({ data: { completed } });
  revalidateTag("todos");
}

export async function deleteCompletedTodos() {
  const todos = await fetchTodos();
  await prisma.todo.deleteMany({
    where: {
      id: {
        in: todos.filter(({ completed }) => completed).map(({ id }) => id),
      },
    },
  });
  revalidateTag("todos");
}
