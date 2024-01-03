import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Toolbar } from ".";
import {
  IComponentStyling,
  ComponentSizeEnum,
  ComponentVariantEnum,
  IComponentSize,
  IReactChildren,
  ComponentSideEnum,
} from "../../../../../types";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const meta = {
  title: "Components/Bases/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    defaultOpen: true,
    raw: false,
    side: ComponentSideEnum.Left,
    sizing: ComponentSizeEnum.Large,
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
    <Wrapper>
      <Toolbar.Root>
        <Toolbar
          raw={args.raw}
          side={args.side}
          sizing={args.sizing}
          defaultOpen={args.defaultOpen}
          style={{
            height: "calc(100dvh - (var(--measurement-medium-30) * 2))",
          }}
        >
          <Toolbar.Section>Item</Toolbar.Section>
          <Toolbar.Trigger>&hArr;</Toolbar.Trigger>
        </Toolbar>
      </Toolbar.Root>
    </Wrapper>
  ),
};
