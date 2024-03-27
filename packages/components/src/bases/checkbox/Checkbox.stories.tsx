import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from ".";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const meta = {
  title: "Components/Bases/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => (
    <Checkbox.Root>
      <Checkbox>
        <Checkbox.Indicator />
      </Checkbox>
    </Checkbox.Root>
  ),
};
