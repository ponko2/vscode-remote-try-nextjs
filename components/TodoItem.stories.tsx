import { TodoItem } from "@/components/TodoItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoItem> = {
  component: TodoItem,
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    todo: {
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "Hello, World!!",
      completed: false,
    },
  },
};

export const Completed: Story = {
  args: {
    ...Basic.args,
    todo: {
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "Hello, World!!",
      completed: true,
    },
  },
};
