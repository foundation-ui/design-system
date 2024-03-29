import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from ".";
import { Container } from "../../";
import { ComponentSizeEnum, ComponentVariantEnum } from "../../../../../types";

const meta = {
  title: "Components/Bases/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default = {
  args: {
    value: "",
    proximity: false,
    global: false,
  },
  argTypes: {
    spacing: {
      options: [
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ],
      control: { type: "radio" },
    },
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
    <Accordion.Root>
      <Accordion>
        <Accordion.Trigger value="demo">🐻‍❄️</Accordion.Trigger>
        <Accordion.Content value="demo">🐻🐻‍❄️🦊🐱🐶</Accordion.Content>
      </Accordion>
    </Accordion.Root>
  ),
};
export const DefaultOpen: Story = {
  render: ({ ...args }) => (
    <Accordion.Root>
      <Accordion>
        <Accordion.Trigger value="demo">🐻</Accordion.Trigger>
        <Accordion.Content
          value="demo"
          defaultOpen
          proximity
          global
          spacing="small"
        >
          🐻🐻‍❄️🦊🐱🐶
        </Accordion.Content>
      </Accordion>
    </Accordion.Root>
  ),
};
export const Group: Story = {
  render: ({ ...args }) => (
    <Container.Row spacing="large">
      {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
        <Accordion.Root>
          <Accordion key={item}>
            <Accordion.Trigger value={item}>{item}</Accordion.Trigger>
            <Accordion.Content value={item}>{item}</Accordion.Content>
          </Accordion>
        </Accordion.Root>
      ))}
    </Container.Row>
  ),
};
