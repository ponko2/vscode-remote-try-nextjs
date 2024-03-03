"use server";

import prisma from "@/actions/db";
import { unstable_noStore as noStore, revalidateTag } from "next/cache";

export async function fetchTodos() {
  noStore();
  return prisma.todo.findMany();
}

export async function createTodo(formData: FormData) {
  const title = (formData.get("title") as string).trim();
  if (title) {
    await prisma.todo.create({ data: { title } });
    revalidateTag("todos");
  }
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.todo.delete({ where: { id } });
  revalidateTag("todos");
}

export async function updateTodo(formData: FormData) {
  const id = formData.get("id") as string;
  const title = (formData.get("title") as string).trim();
  const completed = (formData.get("completed") as string) === "true";
  if (title) {
    await prisma.todo.update({
      where: { id },
      data: { title, completed },
    });
  } else {
    await prisma.todo.delete({ where: { id } });
  }
  revalidateTag("todos");
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
