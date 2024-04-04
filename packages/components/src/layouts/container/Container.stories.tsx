import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "../../";
import { ComponentSizeEnum } from "../../../../../types";

const meta = {
  title: "Components/Layouts/Container",
  component: Container,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Container>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  argTypes: {
    spacing: {
      options: [
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ],
      control: { type: "radio" },
    },
  },
  render: ({ ...args }) => (
    <Container>
      {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Container>
  ),
};
export const Proximity: Story = {
  render: ({ ...args }) => (
    <Container proximity>
      {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Container>
  ),
};
export const Global: Story = {
  render: ({ ...args }) => (
    <Container proximity global>
      {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Container>
  ),
};
export const Row: Story = {
  render: ({ ...args }) => (
    <Container.Row>
      {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Container.Row>
  ),
};
export const Col: Story = {
  render: ({ ...args }) => (
    <Container.Col>
      {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Container.Col>
  ),
};
