import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Collapsible } from ".";
import { Container } from "../../";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const meta = {
  title: "Components/Bases/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Collapsible>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    raw: false,
    defaultOpen: false,
    showFirstChild: false,
  },
  argTypes: {
    variant: {
      options: [
        ComponentVariantEnum.Primary,
        ComponentVariantEnum.Secondary,
        ComponentVariantEnum.Tertiary,
        ComponentVariantEnum.Mono,
        ComponentVariantEnum.Border,
        ComponentVariantEnum.Ghost,
      ],
      control: { type: "radio" },
    },
    sizing: {
      options: [
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ],
      control: { type: "radio" },
    },
  },
  render: ({ ...args }) => (
    <Collapsible.Root>
      <Collapsible>
        <Collapsible.Trigger>🐻‍❄️</Collapsible.Trigger>
        <Collapsible.Content>🐻🐻‍❄️🦊🐱🐶</Collapsible.Content>
      </Collapsible>
    </Collapsible.Root>
  ),
};
export const DefaultOpen: Story = {
  render: ({ ...args }) => (
    <Collapsible.Root>
      <Collapsible>
        <Collapsible.Trigger>🐻‍❄️</Collapsible.Trigger>
        <Collapsible.Content defaultOpen>🐻🐻‍❄️🦊🐱🐶</Collapsible.Content>
      </Collapsible>
    </Collapsible.Root>
  ),
};
export const ShowFirstChild: Story = {
  render: ({ ...args }) => (
    <Collapsible.Root>
      <Collapsible>
        <Collapsible.Trigger>🐻‍❄️</Collapsible.Trigger>
        <Collapsible.Content showFirstChild>
          {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
            <p>{item}</p>
          ))}
        </Collapsible.Content>
      </Collapsible>
    </Collapsible.Root>
  ),
};
export const Group: Story = {
  render: ({ ...args }) => (
    <Container.Row spacing="large">
      {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
        <Collapsible.Root>
          <Collapsible key={item}>
            <Collapsible.Trigger>{item}</Collapsible.Trigger>
            <Collapsible.Content>{item}</Collapsible.Content>
          </Collapsible>
        </Collapsible.Root>
      ))}
    </Container.Row>
  ),
};
