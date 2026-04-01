import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page, Tree } from "..";
import { ComponentSizeEnum, ComponentVariantEnum } from "../../../../types";

const meta = {
  title: "Components/Tree",
  component: Tree,
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
} satisfies Meta<typeof Tree>;
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
    <Tree.Root>
      <Tree>
        <Tree.Node nodeId="src">
          <Tree.Trigger nodeId="src">src</Tree.Trigger>
          <Tree.Content nodeId="src">
            <Tree.Node level={1} nodeId="index.ts">
              <Tree.Trigger nodeId="index.ts">index.ts</Tree.Trigger>
            </Tree.Node>
          </Tree.Content>
        </Tree.Node>
      </Tree>
    </Tree.Root>
  ),
};

export const DefaultOpen: Story = {
  render: ({ ...args }) => (
    <Tree.Root>
      <Tree>
        <Tree.Node nodeId="src">
          <Tree.Trigger nodeId="src">src</Tree.Trigger>
          <Tree.Content nodeId="src" defaultOpen>
            <Tree.Node level={1} nodeId="index.ts">
              <Tree.Trigger nodeId="index.ts">index.ts</Tree.Trigger>
            </Tree.Node>
          </Tree.Content>
        </Tree.Node>
      </Tree>
    </Tree.Root>
  ),
};

export const Nested: Story = {
  render: ({ ...args }) => (
    <Tree.Root>
      <Tree>
        <Tree.Node nodeId="src">
          <Tree.Trigger nodeId="src">src</Tree.Trigger>
          <Tree.Content nodeId="src" defaultOpen>
            <Tree.Node level={1} nodeId="components">
              <Tree.Trigger nodeId="components">components</Tree.Trigger>
              <Tree.Content nodeId="components" defaultOpen>
                <Tree.Node level={2} nodeId="button.ts">
                  <Tree.Trigger nodeId="button.ts">button.ts</Tree.Trigger>
                </Tree.Node>
                <Tree.Node level={2} nodeId="card.ts" isLast>
                  <Tree.Trigger nodeId="card.ts">card.ts</Tree.Trigger>
                </Tree.Node>
              </Tree.Content>
            </Tree.Node>
            <Tree.Node level={1} nodeId="index.ts" isLast>
              <Tree.Trigger nodeId="index.ts">index.ts</Tree.Trigger>
            </Tree.Node>
          </Tree.Content>
        </Tree.Node>
      </Tree>
    </Tree.Root>
  ),
};

export const Group: Story = {
  render: ({ ...args }) => (
    <Tree.Root>
      <Tree>
        {["src", "public", "tests", "docs", "config"].map(
          (item, index, array) => (
            <Tree.Node
              key={item}
              nodeId={item}
              isLast={index === array.length - 1}
            >
              <Tree.Trigger nodeId={item}>{item}</Tree.Trigger>
              <Tree.Content nodeId={item}>
                <Tree.Node level={1} nodeId={`${item}/index.ts`} isLast>
                  <Tree.Trigger nodeId={`${item}/index.ts`}>
                    index.ts
                  </Tree.Trigger>
                </Tree.Node>
              </Tree.Content>
            </Tree.Node>
          ),
        )}
      </Tree>
    </Tree.Root>
  ),
};
