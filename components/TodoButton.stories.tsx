import { TodoButton } from "@/components/TodoButton";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TodoButton,
} satisfies Meta<typeof TodoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    onClick: action("clicked"),
    children: "Hello, World!!",
  },
} satisfies Story;
