import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Toolbar } from ".";
import { Container } from "../..";
import { ComponentSizeEnum, ComponentSideEnum } from "../../../../../types";

const meta = {
  title: "Components/Layouts/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Toolbar>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default = {
  args: {
    raw: false,
    side: ComponentSideEnum.Left,
    defaultOpen: true,
    fixed: false,
    showoncollapse: true,
    showfirstchild: true,
    shortcut: true,
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
      <Toolbar>
        <Toolbar.Section>
          <Toolbar.Item>🐻‍❄️</Toolbar.Item>
        </Toolbar.Section>

        <Toolbar.Trigger>&hArr;</Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  ),
};
export const Horizontal: Story = {
  render: ({ ...args }) => (
    <Container.Row alignmode="space-between">
      {["left", "right"].map((item) => (
        <Toolbar.Root key={item}>
          <Toolbar side={item}>
            <Toolbar.Section>
              <Toolbar.Item>🐻‍❄️</Toolbar.Item>
            </Toolbar.Section>

            <Toolbar.Trigger>&hArr;</Toolbar.Trigger>
          </Toolbar>
        </Toolbar.Root>
      ))}
    </Container.Row>
  ),
};
export const Vertical: Story = {
  render: ({ ...args }) => (
    <Container.Col alignmode="space-between">
      {["top", "bottom"].map((item) => (
        <Toolbar.Root key={item}>
          <Toolbar side={item}>
            <Toolbar.Section>
              <Toolbar.Item>🐻‍❄️</Toolbar.Item>
            </Toolbar.Section>

            <Toolbar.Trigger>&hArr;</Toolbar.Trigger>
          </Toolbar>
        </Toolbar.Root>
      ))}
    </Container.Col>
  ),
};
export const Height: Story = {
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
