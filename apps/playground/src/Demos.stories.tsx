import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  useDesignTokens,
  GetTokenFromSource,
  GetTokenBase,
  js_design_tokens,
} from "../../../packages/tokens";
import {
  TokenTypesEnum,
  SizesEnum,
  MeasurementFormatEnum,
} from "../../../types";

const Introduction = () => {
  const tokens = useDesignTokens();

  // console.log(js_design_tokens);
  console.log(
    GetTokenFromSource({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-darker",
    })?.alpha
  );
  return (
    <section>
      <hgroup>
        <h1>Tokens</h1>
      </hgroup>
    </section>
  );
};

const meta = {
  title: "Demos",
  component: Introduction,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Introduction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {};
