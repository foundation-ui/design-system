import React from "react";
import styled, { css } from "styled-components";
import type { Meta } from "@storybook/react";

import {
  generateColorTokens,
  generateMeasurementTokens,
  generateSequenceTokens,
  generateTokensFromTemplate,
  generateTokensLibrary,
  generateCSSVariables,
  generateSizeClasses,
  generateLayoutClasses,
} from "@foundation-ui/core";
import {
  ColorModeContext,
  json_design_tokens_template,
  js_design_tokens,
  GetColorTokenBase,
  GetTokenFromSource,
} from "@foundation-ui/tokens";
import { Page, Button } from "@foundation-ui/components";
import {
  ComponentSideEnum,
  ComponentSizeEnum,
  RatioEnum,
  MeasureVariantEnum,
} from "../../../types";

const meta = {
  title: "Sandbox/Token Engine",
  component: Page,
} satisfies Meta<typeof Page>;
export default meta;

const GENERATORS = [
  {
    label: "color",
    desc: "Generate a color Design token definition with variations",
    args: "generateColorTokens",
    fn: generateColorTokens("black", "ED4A35", {
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

    console.log(
      generateSizeClasses(js_design_tokens.design_tokens.measurement)
    );

    console.log(generateLayoutClasses());
    return (
      <Page>
        <section style={{ height: "100dvh", width: "100%" }}>
          <Page.Navigation>
            <Button
              variant="ghost"
              sizing="small"
              onClick={updateColorMode}
              title={darkMode ? "Light" : "Dark"}
            >
              {darkMode ? "🌝" : "🌚"}
            </Button>
          </Page.Navigation>

          <Page.Content>
            <hgroup>
              <h4 className="p-b-small-60">Token Engine</h4>
              <small data-emphasis-level="low">@foundation-ui/core</small>
            </hgroup>

            {GENERATORS.map((item) => (
              <Card key={item.label}>
                <p style={{ textTransform: "capitalize" }}>
                  {item.label}
                  <br />
                  <small data-emphasis-level="low">{item.args}</small>
                </p>
                <Button
                  variant="secondary"
                  sizing="small"
                  onClick={() => setGenerated(JSON.stringify(item.fn))}
                >
                  ↗
                </Button>

                <p data-emphasis-level="low">{item.desc}</p>
              </Card>
            ))}
          </Page.Content>

          <Page.Panel
            shortcut
            hotkey=","
            side={ComponentSideEnum.Bottom}
            sizing="large"
            fixed
            defaultOpen
          >
            <div className="flex justify-start align-center g-medium-10">
              <Button
                onClick={() =>
                  navigator.clipboard
                    .writeText(generated)
                    .then(() => alert("Output copied!"))
                }
                disabled={generated === ""}
                sizing="small"
              >
                Output
              </Button>
              <Button
                onClick={() => {
                  setGenerated("");
                }}
                disabled={generated === ""}
                sizing="small"
              >
                Clear
              </Button>
            </div>

            <code
              data-emphasis-level="low"
              style={{
                fontSize: "66%",
                opacity: 0.8,
              }}
            >
              {generated}
            </code>
          </Page.Panel>
        </section>
      </Page>
    );
  },
};
