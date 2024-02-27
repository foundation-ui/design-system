import React from "react";
import styled from "styled-components";
import { Preview } from "@storybook/react";
import { DesignTokensProvider } from "../packages/tokens";
import {
  CSSRoot,
  ResetStyles,
  TypographyColors,
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
