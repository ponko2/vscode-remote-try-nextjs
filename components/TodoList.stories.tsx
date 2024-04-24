import { TodoList } from "@/components/TodoList";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TodoList,
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
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
} satisfies Story;
