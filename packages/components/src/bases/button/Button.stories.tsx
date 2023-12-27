import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonVariantEnum } from ".";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);
`;
const meta = {
  title: "Components/Bases/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "variants-btn",
    disabled: false,
    children: "Button",
    variant: ButtonVariantEnum.Primary,
  },
  render: ({ ...args }) => (
    <Wrapper>
      <Button {...args} />
    </Wrapper>
  ),
};
