import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from ".";
import { Container } from "../../";
import { ComponentSizeEnum, ComponentVariantEnum } from "../../../../../types";

const meta = {
  title: "Components/Bases/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => <Button {...args} />,
};
export const Sizes: Story = {
  render: ({ ...args }) => {
    return (
      <Container.Row spacing="small" alignmode="center">
        <Button sizing="large">Large</Button>
        <Button sizing="medium">Medium</Button>
        <Button sizing="small">Small</Button>
      </Container.Row>
    );
  },
};
export const Variants: Story = {
  render: ({ ...args }) => {
    return (
      <Container.Row spacing="small" alignmode="center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="mono">Mono</Button>
        <Button variant="border">Border</Button>
        <Button variant="ghost">Ghost</Button>
      </Container.Row>
    );
  },
};
