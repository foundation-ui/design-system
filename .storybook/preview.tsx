import React from "react";
import styled from "styled-components";
import theme from "./theme";

import { Preview } from "@storybook/react";
import DocumentationTemplate from "./DocumentationTemplate.mdx";
import { DesignTokensProvider } from "../packages/tokens";
import { ColorModeProvider } from "../packages/tokens";
import {
  CSSRoot,
  ResetStyles,
  TypographyColors,
  TypographySizing,
} from "../packages/styles";

const StoriesWrapepr = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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
          ["Usage"],
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
            <ResetStyles />
            <CSSRoot />
            <TypographyColors />
            <TypographySizing />
            <StoriesWrapepr>
              <div id="dialog-portal" />
              <Story />
            </StoriesWrapepr>
          </ColorModeProvider>
        </DesignTokensProvider>
      );
    },
  ],
};

export default preview;
