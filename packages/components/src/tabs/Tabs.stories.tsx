import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page, Tabs } from "..";
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
      <Page>
        <Page.Content className="p-medium-30">
          <div className="flex flex-column  g-medium-30">
            <Story />
          </div>
        </Page.Content>
      </Page>
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
        <div className="flex g-medium-30 p-b-medium-30">
          <Tabs.Trigger value="eng" variant="link">
            Engineering
          </Tabs.Trigger>
          <Tabs.Trigger value="design" variant="link">
            Design
          </Tabs.Trigger>
        </div>
        <Tabs.Content value="eng">
          Iste nam quasi quam. Ullam numquam reiciendis ratione rem consequatur
          vero suscipit ut dicta, ducimus magni doloribus est, accusantium
          explicabo quae fuga.
        </Tabs.Content>
        <Tabs.Content value="design">
          Fuga aut reiciendis porro! Aspernatur autem voluptatibus, quis
          assumenda consectetur, qui ipsam placeat cum harum animi
          necessitatibus! Error nisi dolore numquam neque.
        </Tabs.Content>
      </Tabs>
    </Tabs.Root>
  ),
};
export const DefaultOpen: Story = {
  render: ({ ...args }) => (
    <Tabs.Root>
      <Tabs defaultOpen="eng">
        <div className="flex g-medium-30 p-b-medium-30">
          <Tabs.Trigger value="eng" variant="link">
            Engineering
          </Tabs.Trigger>
          <Tabs.Trigger value="design" variant="link">
            Design
          </Tabs.Trigger>
        </div>
        <Tabs.Content value="eng">
          Iste nam quasi quam. Ullam numquam reiciendis ratione rem consequatur
          vero suscipit ut dicta, ducimus magni doloribus est, accusantium
          explicabo quae fuga.
        </Tabs.Content>
        <Tabs.Content value="design">
          Fuga aut reiciendis porro! Aspernatur autem voluptatibus, quis
          assumenda consectetur, qui ipsam placeat cum harum animi
          necessitatibus! Error nisi dolore numquam neque.
        </Tabs.Content>
      </Tabs>
    </Tabs.Root>
  ),
};
