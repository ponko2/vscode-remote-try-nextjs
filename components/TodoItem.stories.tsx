import { TodoItem } from "@/components/TodoItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TodoItem,
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    todo: {
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "Hello, World!!",
      completed: false,
    },
  },
} satisfies Story;

export const Completed = {
  args: {
    todo: {
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "Hello, World!!",
      completed: true,
    },
  },
} satisfies Story;
