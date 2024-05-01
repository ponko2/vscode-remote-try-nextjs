import { TodoHeader } from "@/components/TodoHeader";
import type { Meta, StoryObj } from "@storybook/react";

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
} satisfies Story;

export const HasActive = {
  args: {
    todosCount: 1,
    completedTodosCount: 0,
  },
} satisfies Story;

export const IsAllCompleted = {
  args: {
    todosCount: 1,
    completedTodosCount: 1,
  },
} satisfies Story;
