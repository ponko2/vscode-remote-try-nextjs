import { TodoFooter } from "@/components/TodoFooter";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoFooter> = {
  component: TodoFooter,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    todosCount: 1,
    completedTodosCount: 1,
  },
};

export const HasCompleted: Story = {
  args: {
    ...Basic.args,
    todosCount: 2,
    completedTodosCount: 1,
  },
};
