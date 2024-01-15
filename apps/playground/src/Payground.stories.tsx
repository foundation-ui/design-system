import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ColorModeContext } from "../../../packages/core";
import {
  json_design_tokens_template,
  js_design_tokens,
  json_design_tokens,
  GetTokenFromSource,
} from "../../../packages/tokens";
import {
  generateColorTokens,
  generateMeasurementTokens,
  generateSequenceTokens,
  generateTokensFromTemplate,
  generateTokensLibrary,
  generateCSSVariables,
} from "../../../packages/foundations";
import {
  Portal,
  Page,
  Container,
  ContainerAlignModeEnum,
  Avatar,
  Button,
  Toolbar,
} from "../../../packages/components";

import {
  ComponentVariantEnum,
  ComponentSideEnum,
  ComponentSizeEnum,
  RatioEnum,
  MeasureVariantEnum,
} from "../../../types";

const meta = {
  title: "Payground",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
export const App = {
  args: {},
  argTypes: {},

  render: ({ ...args }) => {
    const { colorMode, setColorMode } = React.useContext(ColorModeContext);

    const darkMode = colorMode === "dark";
    const updateColorMode = () =>
      darkMode ? setColorMode("light") : setColorMode("dark");

    const generators = {
      color: () => generateColorTokens("black", "212121", { alpha: true }),
      opacity: () => generateSequenceTokens("opacity-base", 1, 10, 10, true),
      depth: () => generateSequenceTokens("depth-base", 1, 10, 10, false),
      fs: () =>
        generateMeasurementTokens(
          "fs-base",
          12,
          10,
          RatioEnum.MajorThird,
          MeasureVariantEnum.FontSize
        ),
      ms: () =>
        generateMeasurementTokens(
          "ms-base",
          12,
          10,
          RatioEnum.MajorThird,
          MeasureVariantEnum.Measurement
        ),

      tokenFromTemplate: () =>
        generateTokensFromTemplate(json_design_tokens_template[3]),

      libraryFromTemplate: () =>
        generateTokensLibrary("basic UI dsl", json_design_tokens_template),

      cssVariables: () =>
        generateCSSVariables(
          generateTokensLibrary("basic UI dsl", json_design_tokens_template)
        ),
    };

    return (
      <React.Fragment>
        <div id="notification-page-portal" />

        <Page.Root>
          <Page>
            <Page.Tools
              shortcut
              hotkey=";"
              showOnCollapse
              side={ComponentSideEnum.Left}
              sizing={ComponentSizeEnum.Small}
            >
              <Avatar
                src="https://avatars.githubusercontent.com/u/153380498?s=160&v=4"
                alt="external-source-avatar"
                sizing={ComponentSizeEnum.Small}
              />

              <Toolbar.Item>
                <Container.Col
                  spacing={ComponentSizeEnum.Small}
                  style={{ marginTop: 12 }}
                >
                  <p>a</p>
                </Container.Col>
              </Toolbar.Item>
            </Page.Tools>

            <Container.Col>
              <Page.Navigation>
                <Container.Row
                  spacing={ComponentSizeEnum.Small}
                  alignmode={ContainerAlignModeEnum.SpaceBetween}
                >
                  <Button sizing={ComponentSizeEnum.Small}>
                    &nbsp;&nbsp;&nbsp;
                  </Button>
                  <Button
                    variant={ComponentVariantEnum.Tertiary}
                    sizing={ComponentSizeEnum.Small}
                    onClick={updateColorMode}
                  >
                    {darkMode ? <span>&#9728;</span> : <span>&#9790;</span>}
                  </Button>
                </Container.Row>
              </Page.Navigation>
              <Page.Menu>
                <small>Generators</small>
              </Page.Menu>

              <Page.Content>
                <Container.Col spacing={ComponentSizeEnum.Small}>
                  <Button onClick={() => console.log(generators.color())}>
                    Colors
                  </Button>

                  <Button onClick={() => console.log(generators.depth())}>
                    Depth
                  </Button>
                  <Button onClick={() => console.log(generators.opacity())}>
                    Opacity
                  </Button>

                  <Button onClick={() => console.log(generators.ms())}>
                    Measurements
                  </Button>
                  <Button onClick={() => console.log(generators.fs())}>
                    FontSizes
                  </Button>

                  <Button
                    onClick={() => console.log(generators.tokenFromTemplate())}
                  >
                    Tokens from template
                  </Button>
                  <Button
                    onClick={() =>
                      console.log(generators.libraryFromTemplate())
                    }
                  >
                    Library from template
                  </Button>

                  <Button
                    onClick={() => console.log(generators.cssVariables())}
                  >
                    Css Variables
                  </Button>
                </Container.Col>
              </Page.Content>
            </Container.Col>
          </Page>
        </Page.Root>
      </React.Fragment>
    );
  },
};
