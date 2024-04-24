import { TodoFooter } from "@/components/TodoFooter";
import type { Meta, StoryObj } from "@storybook/react";

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
} satisfies Story;

export const HasCompleted = {
  args: {
    ...Basic.args,
    todosCount: 2,
    completedTodosCount: 1,
  },
} satisfies Story;
