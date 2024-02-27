import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from ".";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

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
export const Default = {
  args: {
    raw: false,
    variant: ComponentVariantEnum.Tertiary,
    sizing: ComponentSizeEnum.Medium,
    defaultOpen: "2",
    children: "Default Tabs",
  },
  argTypes: {
    variant: {
      options: [
        ComponentVariantEnum.Primary,
        ComponentVariantEnum.Secondary,
        ComponentVariantEnum.Tertiary,
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
    <Wrapper>
      <Tabs.Root>
        <Tabs
          defaultOpen={args.defaultOpen}
          style={{ display: "flex", gap: 6 }}
        >
          <Tabs.Trigger
            value="1"
            raw={args.raw}
            variant={args.variant}
            sizing={args.sizing}
          >
            Default Tab 1
          </Tabs.Trigger>
          <Tabs.Trigger
            value="2"
            raw={args.raw}
            variant={args.variant}
            sizing={args.sizing}
          >
            Default Tab 2
          </Tabs.Trigger>
        </Tabs>
        <Tabs.Content value="1">
          <p>Default Tab item 1</p>
        </Tabs.Content>
        <Tabs.Content value="2">
          <p>Default Tab item 2</p>
        </Tabs.Content>
      </Tabs.Root>
    </Wrapper>
  ),
};
