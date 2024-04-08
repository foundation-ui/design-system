import React from "react";
import styled from "styled-components";
import type { Meta } from "@storybook/react";

import {
  ColorModeContext,
  generateColorTokens,
  generateMeasurementTokens,
  generateSequenceTokens,
  generateTokensFromTemplate,
  generateTokensLibrary,
  generateCSSVariables,
} from "@foundation-ui/core";
import { json_design_tokens_template } from "@foundation-ui/tokens";
import {
  Page,
  Container,
  ContainerAlignModeEnum,
  Button,
} from "@foundation-ui/components";
import {
  ComponentSideEnum,
  ComponentSizeEnum,
  RatioEnum,
  MeasureVariantEnum,
} from "../../../types";

const meta = {
  title: "Sandbox/Design Tokens Generators",
  component: Page,
} satisfies Meta<typeof Page>;
export default meta;

const GENERATORS = [
  {
    label: "color",
    desc: "Generate a color Design token definition with variations",
    args: "generateColorTokens",
    fn: generateColorTokens("black", "212121", {
      alpha: true,
      tint: true,
      shade: true,
    }),
  },
  {
    label: "measurement",
    desc: "Generate a measurement Design token definition with variations",
    args: "generateMeasurementTokens",
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
    args: "generateMeasurementTokens",
    fn: generateMeasurementTokens(
      "fs-base",
      12,
      10,
      RatioEnum.MajorThird,
      MeasureVariantEnum.FontSize
    ),
  },
  {
    label: "depth",
    desc: "Generate a depth Design token definition with variations",
    args: "generateSequenceTokens",
    fn: generateSequenceTokens("depth-base", 1, 10, 10, false),
  },
  {
    label: "opacity",
    desc: "Generate an opacity Design token definition with variations",
    args: "generateSequenceTokens",
    fn: generateSequenceTokens("opacity-base", 1, 10, 10, true),
  },
  {
    label: "tokens",
    desc: "Generate a design tokens set with a few parameters",
    args: "generateTokensFromTemplate",
    fn: generateTokensFromTemplate(json_design_tokens_template[2]),
  },
  {
    label: "library",
    desc: "Generate a design tokens library with your existing values",
    args: "generateTokensLibrary",
    fn: generateTokensLibrary("basic UI dsl", json_design_tokens_template),
  },
  {
    label: "variables",
    desc: "Create the CSS variables to put in your root definition and spread your design tokens accross your app",
    args: "generateTokensLibrary",
    fn: generateCSSVariables(
      generateTokensLibrary("basic UI dsl", json_design_tokens_template)
    ),
  },
];

const Card = styled.article`
  box-sizing: border-box;
  border-radius: var(--measurement-medium-60);
  border: 1px solid ${({ theme }) => theme.colors.text.alpha[0].rgb};
  background: ${({ theme }) => theme.colors.body.alpha[0].rgb};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  gap: var(--measurement-medium-30);
  padding: var(--measurement-medium-60);
  max-width: var(--measurement-large-90);
  min-height: var(--measurement-large-70);
  width: 100%;
`;

export const Generators = {
  render: () => {
    const { colorMode, setColorMode } = React.useContext(ColorModeContext);
    const [generated, setGenerated] = React.useState<string>("");

    const darkMode = colorMode === "dark";
    const updateColorMode = () =>
      darkMode ? setColorMode("light") : setColorMode("dark");

    return (
      <Page>
        <Container.Col style={{ height: "100dvh" }}>
          <Page.Navigation>
            <Container.Row
              spacing={ComponentSizeEnum.Small}
              alignmode={ContainerAlignModeEnum.SpaceBetween}
              style={{ alignItems: "center" }}
            >
              <svg height="24" viewBox="0 0 16 36" fill="none">
                <path
                  d="M12.3494 0H6.75716V2.14559H4.50505V4.37077H2.33008V6.51656H0V9.37749H2.33008V13.1126V15.4173H0V18.2782H2.33008V26.5431V29.404V31.629V33.1392H0.077474V36.0001H2.87359V33.6158H5.04852V31.629H7.22328V29.404H9.55338V26.5431H7.22328V18.2782H7.2233V15.9736H9.55338V13.7483H11.7283V10.8874H7.22328V9.37749H7.2233V6.51656H7.22328V5.00652H8.77653V7.2317H10.9515V9.37749H13.7476V7.2317H15.9998V4.37077H13.8254V2.14559H12.3494V0Z"
                  fill={darkMode ? "white" : "black"}
                />
              </svg>

              <Button
                variant="ghost"
                sizing={ComponentSizeEnum.Small}
                onClick={updateColorMode}
                title={darkMode ? "Light" : "Dark"}
              >
                {darkMode ? "🌝" : "🌚"}
              </Button>
            </Container.Row>
          </Page.Navigation>

          <Page.Content>
            <Container.Col spacing="large">
              <Container>
                <h4>Design Tokens Generators</h4>
                <small data-emphasis-level="low">@foundation-ui/core</small>
              </Container>

              <Container.Row
                spacing={ComponentSizeEnum.Medium}
                style={{
                  flexWrap: "wrap",
                  marginBottom: "var(--measurement-large-90)",
                }}
              >
                {GENERATORS.map((item) => (
                  <Card key={item.label}>
                    <Container.Row
                      alignmode="space-between"
                      style={{ alignItems: "center" }}
                    >
                      <p style={{ textTransform: "capitalize" }}>
                        {item.label}
                        <br />
                        <small data-emphasis-level="low">{item.args}</small>
                      </p>
                      <Button
                        variant="secondary"
                        sizing={ComponentSizeEnum.Small}
                        onClick={() => setGenerated(JSON.stringify(item.fn))}
                      >
                        ↗
                      </Button>
                    </Container.Row>

                    <p data-emphasis-level="low">{item.desc}</p>
                  </Card>
                ))}
              </Container.Row>
            </Container.Col>
          </Page.Content>

          <Page.Panel
            shortcut
            hotkey=","
            side={ComponentSideEnum.Bottom}
            sizing={ComponentSizeEnum.Large}
            fixed
            defaultOpen
          >
            <Container proximity spacing="medium">
              <Container.Row spacing="medium">
                <Button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(generated)
                      .then(() => alert("Output copied!"))
                  }
                  disabled={generated === ""}
                  sizing={ComponentSizeEnum.Small}
                >
                  Output
                </Button>
                <Button
                  onClick={() => {
                    setGenerated("");
                  }}
                  disabled={generated === ""}
                  sizing={ComponentSizeEnum.Small}
                >
                  Clear
                </Button>
              </Container.Row>

              <code
                data-emphasis-level="low"
                style={{
                  fontSize: "66%",
                  opacity: 0.8,
                }}
              >
                {generated}
              </code>
            </Container>
          </Page.Panel>
        </Container.Col>
      </Page>
    );
  },
};
