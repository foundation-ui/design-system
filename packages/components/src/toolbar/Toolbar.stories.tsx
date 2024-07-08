import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Toolbar } from "..";
import {
  ComponentSizeEnum,
  ComponentSideEnum,
  ComponentHeightEnum,
} from "../../../../types";

const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Toolbar>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default = {
  args: {
    raw: false,
    defaultOpen: false,
    showoncollapse: false,
    showfirstchild: false,
    shortcut: false,
    hotkey: ":",
    bindkey: null,
  },
  argTypes: {
    side: {
      options: [
        ComponentSideEnum.Top,
        ComponentSideEnum.Right,
        ComponentSideEnum.Bottom,
        ComponentSideEnum.Left,
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
    height: {
      options: [ComponentHeightEnum.Fullscreen, ComponentHeightEnum.Auto],
      control: { type: "radio" },
    },
  },
  render: ({ ...args }) => (
    <Toolbar.Root>
      <Toolbar>
        <Toolbar.Section>
          <Toolbar.Item>🐻‍❄️</Toolbar.Item>
        </Toolbar.Section>

        <Toolbar.Trigger>&hArr;</Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  ),
};
export const DefaultOpen: Story = {
  render: ({ ...args }) => (
    <Toolbar.Root>
      <Toolbar defaultOpen>
        <Toolbar.Section>
          <Toolbar.Item>🐻‍❄️</Toolbar.Item>
        </Toolbar.Section>

        <Toolbar.Trigger>&hArr;</Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  ),
};
export const Shortcut: Story = {
  render: ({ ...args }) => (
    <Toolbar.Root>
      <Toolbar shortcut hotkey="t">
        <Toolbar.Section>
          <Toolbar.Item>🐻‍❄️</Toolbar.Item>
        </Toolbar.Section>

        <Toolbar.Trigger>&hArr;</Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  ),
};
