import { TodoList } from "@/components/TodoList";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoList> = {
  component: TodoList,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    todos: [
      {
        id: "01FYH5XVSNVSXTSGB8KB858REF",
        title: "foo",
        completed: false,
      },
      {
        id: "01G46BYCGQ1SGVGFMEXZ0DKZAY",
        title: "bar",
        completed: true,
      },
      {
        id: "01G46BZM28F68BCY7EP016G1EZ",
        title: "baz",
        completed: false,
      },
    ],
  },
};
