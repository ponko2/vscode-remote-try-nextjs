import TodoList from "@/components/TodoList";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

const meta = {
  component: TodoList,
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    todos: [
      {
        id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        title: "foo",
        completed: false,
      },
      {
        id: "2c1e6aab-6d91-4414-bf80-3cef026284ab",
        title: "bar",
        completed: true,
      },
    ],
  },
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole("checkbox");
    await expect(checkboxes).toHaveLength(2);
    await expect(checkboxes[0]).not.toBeChecked();
    await expect(checkboxes[1]).toBeChecked();
  },
} satisfies Story;
