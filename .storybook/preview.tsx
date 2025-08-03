import React from "react";
import styled from "styled-components";
import theme from "./theme";

import { Preview } from "@storybook/react";

import { ColorModeProvider } from "../packages/tokens";
import { ResetStyles, CSSRoot, TypographyRoot } from "../packages/styles";

// import DocumentationTemplate from "./DocumentationTemplate.mdx";

const StoriesWrapepr = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const preview: Preview = {
  parameters: {
    // docs: {
    //   theme: theme,
    //   page: DocumentationTemplate,
    //   canvas: {
    //     sourceState: "shown",
    //   },
    // },
    // options: {
    //   storySort: {
    //     order: [
    //       "Introduction",
    //       "Getting Started",
    //       "Design Tokens",
    //       "Assets",
    //       "Generators",
    //       "Theming",
    //       "Styling",
    //       "Components",
    //       ["Usage"],
    //       "Sandbox",
    //     ],
    //   },
    // },
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
        <ColorModeProvider>
          <ResetStyles />
          <CSSRoot />
          <TypographyRoot />
          <StoriesWrapepr>
            <div id="dialog-portal" />
            <Story />
          </StoriesWrapepr>
        </ColorModeProvider>
      );
    },
  ],
};

export default preview;
