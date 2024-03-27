import React from "react";
import styled from "styled-components";
import theme from "./theme";

import { Preview } from "@storybook/react";
import DocumentationTemplate from "./DocumentationTemplate.mdx";
import { DesignTokensProvider } from "../packages/tokens";
import {
  CSSRoot,
  ResetStyles,
  TypographyColors,
  TypographySizing,
  ColorModeProvider,
  SystemThemeProvider,
} from "../packages/core";

const StoriesWrapepr = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.body.base};
`;

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
      page: DocumentationTemplate,
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
          "Sandbox",
        ],
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <DesignTokensProvider>
          <ColorModeProvider>
            <SystemThemeProvider>
              <CSSRoot />
              <ResetStyles />
              <TypographyColors />
              <TypographySizing />
              <StoriesWrapepr>
                <Story />
              </StoriesWrapepr>
            </SystemThemeProvider>
          </ColorModeProvider>
        </DesignTokensProvider>
      );
    },
  ],
};

export default preview;
