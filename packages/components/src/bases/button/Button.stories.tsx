import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonVariantEnum } from ".";
import { ButtonDefaultStyles, ButtonVariantsStyles } from "./styles";

const meta = {
  title: "Components/Bases/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultButton = styled(Button)`
  margin: var(--measurement-medium-60);
`;
const StyledButton = styled(Button)`
  margin: var(--measurement-medium-60);
  ${ButtonDefaultStyles}
  ${ButtonVariantsStyles}
`;

export const Default: Story = {
  args: {
    name: "demo",
    children: "Default button",
  },
  render: ({ ...args }) => <DefaultButton {...args} />,
};

export const DefaultStyled: Story = {
  args: {
    name: "demo",
    disabled: false,
    children: "",
    variant: ButtonVariantEnum.Primary,
  },

  render: ({ ...args }) => <StyledButton {...args} />,
};
