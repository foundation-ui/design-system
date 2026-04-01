import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Accordion, Page } from "..";
import { ComponentSizeEnum, ComponentVariantEnum } from "../../../../types";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
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
} satisfies Meta<typeof Accordion>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default = {
  args: {
    value: "",
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
        <Accordion.Content value="demo" defaultOpen>
          🐻🐻‍❄️🦊🐱🐶
        </Accordion.Content>
      </Accordion>
    </Accordion.Root>
  ),
};
export const Group: Story = {
  render: ({ ...args }) => (
    <React.Fragment>
      {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
        <Accordion.Root key={item}>
          <Accordion className="m-b-medium-30">
            <Accordion.Trigger value={item}>{item}</Accordion.Trigger>
            <Accordion.Content value={item}>{item}</Accordion.Content>
          </Accordion>
        </Accordion.Root>
      ))}
    </React.Fragment>
  ),
};
