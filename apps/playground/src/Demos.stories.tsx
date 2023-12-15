import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  useDesignTokens,
  GetTokenBase,
  js_design_tokens,
} from "../../../packages/tokens";

const Introduction = () => {
  const tokens = useDesignTokens();

  // console.log(js_design_tokens);
  console.log(
    GetTokenBase({
      source: js_design_tokens,
      token_category: "measurement",
      query: "small",
      unit: "px",
    })
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
