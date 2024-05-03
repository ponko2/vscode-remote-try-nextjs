import TodoFooter from "@/components/TodoFooter";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("0")).toBeInTheDocument();
  },
} satisfies Story;

export const HasCompleted = {
  args: {
    todosCount: 2,
    completedTodosCount: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1")).toBeInTheDocument();
  },
} satisfies Story;
