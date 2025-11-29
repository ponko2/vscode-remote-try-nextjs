import type { Preview } from "@storybook/nextjs-vite";
import { sb } from "storybook/test";
import "../app/globals.css";

sb.mock(import("../actions/todo.ts"));

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
} satisfies Preview;

export default preview;
