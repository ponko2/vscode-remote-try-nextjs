import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().trim().min(1),
});

export const updateTodoSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().optional(),
  completed: z
    .literal("on")
    .optional()
    .transform((value) => value === "on"),
});

export const deleteTodoSchema = z.object({
  id: z.uuid(),
});
