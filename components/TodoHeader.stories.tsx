import TodoHeader from "@/components/TodoHeader";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

const meta = {
  component: TodoHeader,
} satisfies Meta<typeof TodoHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    todosCount: 0,
    completedTodosCount: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole("checkbox")).toBeNull();
  },
} satisfies Story;

export const HasActive = {
  args: {
    todosCount: 1,
    completedTodosCount: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("checkbox")).not.toBeChecked();
  },
} satisfies Story;

export const IsAllCompleted = {
  args: {
    todosCount: 1,
    completedTodosCount: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("checkbox")).toBeChecked();
  },
} satisfies Story;
