import { TodoButton } from "@/components/TodoButton";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoButton> = {
  component: TodoButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onClick: action("clicked"),
    children: "Hello, World!!",
  },
};
