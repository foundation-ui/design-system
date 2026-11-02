import React from "react";
import theme from "./theme";

import { ClientProvider } from "./client-provider";
import { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
      // page: DocumentationTemplate,
      canvas: {
        sourceState: "shown",
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Getting Started",
          "Design Tokens",
          "Assets",
          "Generators",
          "Theming",
          "Styling",
          "Components",
          ["Usage"],
          "Sandbox",
        ],
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <ClientProvider>
          <div id="dialog-portal" />
          <Story />
        </ClientProvider>
      );
    },
  ],
};

export default preview;
