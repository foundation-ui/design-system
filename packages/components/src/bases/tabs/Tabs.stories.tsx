import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from ".";
import { ButtonVariantEnum } from "../button";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);
`;

const meta = {
  title: "Components/Bases/Tabs",
  component: Tabs,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOpen: "2",
    children: "Default Tabs",
  },

  render: ({ ...args }) => (
    <Wrapper>
      <Tabs.Root>
        <Tabs
          defaultOpen={args.defaultOpen}
          style={{ display: "flex", gap: 6 }}
        >
          <Tabs.Trigger variant={ButtonVariantEnum.Ghost} value="1">
            Tab 1
          </Tabs.Trigger>
          <Tabs.Trigger variant={ButtonVariantEnum.Ghost} value="2">
            Tab 2
          </Tabs.Trigger>
        </Tabs>
        <Tabs.Content value="1">
          <small>Item 1</small>
        </Tabs.Content>
        <Tabs.Content value="2">
          <small>Item 2</small>
        </Tabs.Content>
      </Tabs.Root>
    </Wrapper>
  ),
};
