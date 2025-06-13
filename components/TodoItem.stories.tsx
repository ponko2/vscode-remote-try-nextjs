import TodoItem from "@/components/TodoItem";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

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
      id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
      title: "Hello, World!!",
      completed: false,
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox")).not.toBeChecked();
    await expect(canvas.getByText("Hello, World!!")).toBeInTheDocument();
  },
} satisfies Story;

export const Completed = {
  args: {
    todo: {
      id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
      title: "Hello, World!!",
      completed: true,
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox")).toBeChecked();
    await expect(canvas.getByText("Hello, World!!")).toBeInTheDocument();
  },
} satisfies Story;
