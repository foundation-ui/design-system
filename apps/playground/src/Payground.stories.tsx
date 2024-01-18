import React from "react";
import styled, { keyframes } from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { ColorModeContext } from "../../../packages/core";
import {
  json_design_tokens_template,
  js_design_tokens,
  json_design_tokens,
  GetTokenFromSource,
  GetTokenBase,
} from "../../../packages/tokens";
import {
  generateColorTokens,
  generateMeasurementTokens,
  generateSequenceTokens,
  generateTokensFromTemplate,
  generateTokensLibrary,
  generateCSSVariables,
  generateAlpha,
  generateVariation,
  getContrastRatio,
  calculateContrastScore,
  MeasurementRatios,
  generateModularScales,
  calculateStackOrder,
  getSequenceUsages,
  PXToREM,
  PXToPT,
  HEXToRGB,
  RGBAToHEX,
  RGBToHSL,
  HEXToHSL,
} from "../../../packages/foundations";
import {
  Portal,
  Page,
  Container,
  ContainerAlignModeEnum,
  Avatar,
  Button,
  Toolbar,
  Tabs,
} from "../../../packages/components";
import {
  ComponentVariantEnum,
  ComponentSideEnum,
  ComponentSizeEnum,
  RatioEnum,
  MeasureVariantEnum,
  ColorModesEnum,
} from "../../../types";

const Card = styled.article`
  box-sizing: border-box;
  border-radius: var(--measurement-medium-30);
  border: 1px solid ${({ theme }) => theme.colors.text.alpha[0].rgb};
  background: ${({ theme }) => theme.colors.body.base};

  display: grid;
  margin: 0;
  gap: var(--measurement-medium-30);
  padding: var(--measurement-medium-60);
  width: 100%;
  max-width: var(--measurement-large-90);
`;

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

    const [generated, setGenerated] = React.useState<string>("");

    const GENERATORS = [
      {
        label: "color",
        desc: "Generate a color Design token definition with variations",
        fn: generateColorTokens("black", "212121", {
          alpha: true,
          tint: true,
          shade: true,
        }),
      },
      {
        label: "generate alpha",
        desc: "Generate the alpha values for a color Design token based on a Hex color code",
        fn: generateAlpha("CC0000", 10),
      },
      {
        label: "generate variation",
        desc: "Generate the shade/tint values for a color Design token based on a Hex color code",
        fn: generateVariation("CC0000", ColorModesEnum.Lighten),
      },
      {
        label: "measurement",
        desc: "Generate a measurement Design token definition with variations",
        fn: generateMeasurementTokens(
          "ms-base",
          12,
          10,
          RatioEnum.MajorThird,
          MeasureVariantEnum.Measurement
        ),
      },
      {
        label: "fontsize",
        desc: "Generate a font size Design token definition with variations",
        fn: generateMeasurementTokens(
          "fs-base",
          12,
          10,
          RatioEnum.MajorThird,
          MeasureVariantEnum.FontSize
        ),
      },
      {
        label: "modular scale",
        desc: "Generate a sequence of number based on controlled multipliers",
        fn: generateModularScales({
          base: 1,
          ratio: [RatioEnum.MajorThird],
          units: 10,
          convert: true,
        }),
      },
      {
        label: "depth",
        desc: "Generate a depth Design token definition with variations",
        fn: generateSequenceTokens("depth-base", 1, 10, 10, false),
      },
      {
        label: "opacity",
        desc: "Generate an opacity Design token definition with variations",
        fn: generateSequenceTokens("opacity-base", 1, 10, 10, true),
      },
      {
        label: "tokens",
        desc: "Generate a design tokens set with a few parameters",
        fn: generateTokensFromTemplate(json_design_tokens_template[3]),
      },
      {
        label: "library",
        desc: "Generate a design tokens library with your existing values",
        fn: generateTokensLibrary("basic UI dsl", json_design_tokens_template),
      },
      {
        label: "variables",
        desc: "Create the CSS variables to put in your root definition and spread your design tokens accross your app",
        fn: generateCSSVariables(
          generateTokensLibrary("basic UI dsl", json_design_tokens_template)
        ),
      },
    ];
    const THEMES = [
      {
        label: "get token",
        desc: "Get a specific token from your Design Tokens library",
        fn: GetTokenFromSource({
          source: json_design_tokens,
          token_category: "color",
          query: "blue",
        }),
      },
      {
        label: "get token base value",
        desc: "Get the value declared as base from the requested Design Tokens",
        fn: GetTokenBase({
          source: json_design_tokens,
          token_category: "color",
          query: "blue",
        }),
      },
      {
        label: "predefined library",
        desc: "A predefined set of design tokens library",
        fn: json_design_tokens,
      },
    ];
    const UTILS = [
      {
        label: "contrast ratio",
        desc: "Get the contrast ratio of a color in its context",
        fn: getContrastRatio([255, 0, 0], [0, 0, 0]),
      },
      {
        label: "contrast score",
        desc: "Get the contrast score of a color in its context",
        fn: calculateContrastScore("CC0000", "000000"),
      },
      {
        label: "stack order",
        desc: "Get the hierarchy of a Design Token based on its context",
        fn: calculateStackOrder(2, Array.from(Array(10).keys())),
      },
      {
        label: "token usage: color",
        desc: "Get the prefered usage of a Color Design Token based on its context",
        fn: getSequenceUsages("F"),
      },
      {
        label: "token usage: sequence",
        desc: "Get the prefered usage of a Depth/Opacity Design Token based on its context",
        fn: getSequenceUsages(null, { label: "low", score: 1 }),
      },
      {
        label: "ratio",
        desc: "A predefined set of multiplier for the generators",
        fn: MeasurementRatios,
      },
    ];
    const CONVERTORS = [
      {
        label: "PXToREM",
        desc: "Converts a Px value into Rem",
        fn: PXToREM(12),
      },
      {
        label: "PXToPT",
        desc: "Converts a Px value into Pt",
        fn: PXToPT(12),
      },
      {
        label: "HEXToRGB",
        desc: "Converts an Hex value into Rgb",
        fn: HEXToRGB("fafafa"),
      },
      {
        label: "RGBAToHEX",
        desc: "Converts an Rgba value into Hsl",
        fn: RGBAToHEX("rgba(255, 0, 0, 0.1)", "212121"),
      },
      {
        label: "RGBToHSL",
        desc: "Converts an Rgb value into Hsl",
        fn: RGBToHSL(255, 0, 0),
      },
      {
        label: "HEXToHSL",
        desc: "Converts an Hex value into Hsl",
        fn: HEXToHSL("CC1010"),
      },
    ];

    return (
      <React.Fragment>
        <div id="notification-page-portal" />

        <Page.Root>
          <Page>
            <Page.Tools
              fixed
              showOnCollapse
              side={ComponentSideEnum.Left}
              sizing={ComponentSizeEnum.Small}
            >
              <Avatar
                src="https://avatars.githubusercontent.com/u/153380498?s=160&v=4"
                alt="external-source-avatar"
                sizing={ComponentSizeEnum.Small}
              />
            </Page.Tools>

            <Container.Col>
              <Page.Navigation>
                <Container.Row
                  spacing={ComponentSizeEnum.Small}
                  alignmode={ContainerAlignModeEnum.End}
                >
                  <Button
                    variant={ComponentVariantEnum.Tertiary}
                    sizing={ComponentSizeEnum.Small}
                    onClick={updateColorMode}
                  >
                    {darkMode ? <span>&#9728;</span> : <span>&#9790;</span>}
                  </Button>
                </Container.Row>
              </Page.Navigation>

              <Page.Content>
                <Container.Col spacing="large">
                  <p>
                    <strong>Generators</strong>
                  </p>
                  <Container.Row
                    spacing={ComponentSizeEnum.Medium}
                    style={{ flexWrap: "wrap" }}
                  >
                    {GENERATORS.map((item, key) => (
                      <Card key={item.label}>
                        <p style={{ textTransform: "capitalize" }}>
                          {item.label}
                        </p>
                        <small data-emphasis-level="low">{item.desc}</small>
                        <Button
                          onClick={() => setGenerated(JSON.stringify(item.fn))}
                          sizing={ComponentSizeEnum.Small}
                        >
                          Sample&nbsp;&rarr;
                        </Button>
                      </Card>
                    ))}
                  </Container.Row>

                  <p>
                    <strong>Themes</strong>
                  </p>
                  <Container.Row
                    spacing={ComponentSizeEnum.Medium}
                    style={{ flexWrap: "wrap" }}
                  >
                    {THEMES.map((item, key) => (
                      <Card key={item.label}>
                        <p style={{ textTransform: "capitalize" }}>
                          {item.label}
                        </p>
                        <small data-emphasis-level="low">{item.desc}</small>
                        <Button
                          onClick={() => setGenerated(JSON.stringify(item.fn))}
                          sizing={ComponentSizeEnum.Small}
                        >
                          Sample&nbsp;&rarr;
                        </Button>
                      </Card>
                    ))}
                  </Container.Row>

                  <p>
                    <strong>Utils</strong>
                  </p>
                  <Container.Row
                    spacing={ComponentSizeEnum.Medium}
                    style={{ flexWrap: "wrap" }}
                  >
                    {UTILS.map((item) => (
                      <Card key={item.label}>
                        <p style={{ textTransform: "capitalize" }}>
                          {item.label}
                        </p>
                        <small data-emphasis-level="low">{item.desc}</small>
                        <Button
                          onClick={() => setGenerated(JSON.stringify(item.fn))}
                          sizing={ComponentSizeEnum.Small}
                        >
                          Sample&nbsp;&rarr;
                        </Button>
                      </Card>
                    ))}
                  </Container.Row>

                  <p>
                    <strong>Convertors</strong>
                  </p>
                  <Container.Row
                    spacing={ComponentSizeEnum.Medium}
                    style={{ flexWrap: "wrap" }}
                  >
                    {CONVERTORS.map((item) => (
                      <Card key={item.label}>
                        <p style={{ textTransform: "capitalize" }}>
                          {item.label}
                        </p>
                        <small data-emphasis-level="low">{item.desc}</small>
                        <Button
                          onClick={() => setGenerated(JSON.stringify(item.fn))}
                          sizing={ComponentSizeEnum.Small}
                        >
                          Sample&nbsp;&rarr;
                        </Button>
                      </Card>
                    ))}
                  </Container.Row>
                </Container.Col>
              </Page.Content>
            </Container.Col>

            <Page.Tools
              fixed
              showOnCollapse
              defaultOpen
              side={ComponentSideEnum.Right}
              sizing={ComponentSizeEnum.Large}
            >
              <Toolbar.Item>
                <Container.Col spacing={ComponentSizeEnum.Small}>
                  <div
                    style={{
                      wordBreak: "break-all",
                      maxHeight: "90dvh",
                      overflowY: "hidden",
                    }}
                  >
                    <Container.Row alignmode="space-between">
                      <Button
                        onClick={() =>
                          navigator.clipboard
                            .writeText(generated)
                            .then(() => alert("Copied!"))
                        }
                        disabled={generated === ""}
                        variant="tertiary"
                        sizing="small"
                      >
                        Copy
                      </Button>
                      <Button
                        onClick={() => setGenerated("")}
                        disabled={generated === ""}
                        variant="tertiary"
                        sizing="small"
                      >
                        Clear
                      </Button>
                    </Container.Row>
                    <code
                      data-emphasis-level="low"
                      style={{
                        fontSize: "66%",
                      }}
                    >
                      {generated}
                    </code>
                  </div>
                </Container.Col>
              </Toolbar.Item>
            </Page.Tools>
          </Page>
        </Page.Root>
      </React.Fragment>
    );
  },
};
