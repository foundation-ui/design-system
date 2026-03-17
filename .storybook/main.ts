import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/**/src/**/*.mdx",

    "../apps/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../apps/**/src/**/*.mdx",
  ],
  addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-docs")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  // docs: {
  //   autodocs: "tag",
  //   defaultName: "Documentation",
  // },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
