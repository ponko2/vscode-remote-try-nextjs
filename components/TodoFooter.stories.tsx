import TodoFooter from "@/components/TodoFooter";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";

const meta = {
  component: TodoFooter,
} satisfies Meta<typeof TodoFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    todosCount: 1,
    completedTodosCount: 1,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("0")).toBeInTheDocument();
  },
} satisfies Story;

export const HasCompleted = {
  args: {
    todosCount: 2,
    completedTodosCount: 1,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1")).toBeInTheDocument();
  },
} satisfies Story;
