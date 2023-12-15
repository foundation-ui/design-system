import React from "react";
import { Preview } from "@storybook/react";
import { DesignTokensProvider } from "../packages/tokens";
import {
  CSSRoot,
  ResetStyles,
  ColorModeProvider,
  SystemThemeProvider,
} from "../packages/core";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <DesignTokensProvider>
        <ColorModeProvider>
          <SystemThemeProvider>
            <CSSRoot />
            <ResetStyles />
            <Story />
          </SystemThemeProvider>
        </ColorModeProvider>
      </DesignTokensProvider>
    ),
  ],
};

export default preview;
