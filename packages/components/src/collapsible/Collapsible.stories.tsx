import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Collapsible, Page } from "..";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../types";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Page>
        <Page.Content className="p-medium-30">
          <Story />
        </Page.Content>
      </Page>
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
            <p key={item}>{item}</p>
          ))}
        </Collapsible.Content>
      </Collapsible>
    </Collapsible.Root>
  ),
};
export const Group: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
        <Collapsible.Root key={item}>
          <Collapsible>
            <Collapsible.Trigger>{item}</Collapsible.Trigger>
            <Collapsible.Content>{item}</Collapsible.Content>
          </Collapsible>
        </Collapsible.Root>
      ))}
    </div>
  ),
};
