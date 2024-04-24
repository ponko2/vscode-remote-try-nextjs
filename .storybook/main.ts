import type { StorybookConfig } from "@storybook/nextjs";

const config = {
  stories: [
    "../app/**/*.mdx",
    "../app/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
} satisfies StorybookConfig;

export default config;
