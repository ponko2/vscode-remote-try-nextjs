import type { StorybookConfig } from "@storybook/nextjs-vite";

const config = {
  stories: [
    "../app/**/*.mdx",
    "../app/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
} satisfies StorybookConfig;

export default config;
