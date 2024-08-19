import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "..";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../types";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Tabs are components for a set of tab panels that allows the user to switch between them.
 *
 * **Best practices:**
 *
 * - Ensure that the tabs can be navigated and activated using the keyboard.
 * - Ensure that the focus is managed correctly when switching between tabs.
 * - Ensure that the active tab is visibly indicated and that its content is visible and focusable.
 *
 */
const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    raw: false,
    defaultOpen: "",
    value: "",
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
    <Tabs.Root>
      <Tabs>
        <div className="flex g-medium-30">
          <Tabs.Trigger value="🐻‍❄️">🐻‍❄️</Tabs.Trigger>
          <Tabs.Trigger value="🐻">🐻</Tabs.Trigger>
        </div>
      </Tabs>
      <Tabs.Content value="🐻‍❄️">🐻‍❄️</Tabs.Content>
      <Tabs.Content value="🐻">🐻</Tabs.Content>
    </Tabs.Root>
  ),
};
export const DefaultOpen: Story = {
  render: ({ ...args }) => (
    <Tabs.Root>
      <Tabs defaultOpen="🐻">
        <div className="flex g-medium-30">
          <Tabs.Trigger value="🐻‍❄️">🐻‍❄️</Tabs.Trigger>
          <Tabs.Trigger value="🐻">🐻</Tabs.Trigger>
        </div>
      </Tabs>
      <Tabs.Content value="🐻‍❄️">🐻‍❄️</Tabs.Content>
      <Tabs.Content value="🐻">🐻</Tabs.Content>
    </Tabs.Root>
  ),
};
