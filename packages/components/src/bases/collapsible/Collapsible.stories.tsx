import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Collapsible } from ".";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);
`;

const meta = {
  title: "Components/Bases/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    raw: false,
    variant: ComponentVariantEnum.Tertiary,
    sizing: ComponentSizeEnum.Medium,
    defaultOpen: false,
    showFirstChild: true,
    onClick: () => console.log("Click"),
    children: "Default collapsible",
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
      <Collapsible.Root>
        <Collapsible>
          <Collapsible.Trigger
            raw={args.raw}
            variant={args.variant}
            sizing={args.sizing}
            onClick={args.onClick}
          >
            {args.children}
          </Collapsible.Trigger>
          <Collapsible.Content
            defaultOpen={args.defaultOpen}
            showFirstChild={args.showFirstChild}
          >
            {Array.from("🦠🦖🥚🐣🐥")
              .reverse()
              .map((item: string, key: number) => (
                <p key={item}>Item sample&nbsp;{item}</p>
              ))}
          </Collapsible.Content>
        </Collapsible>
      </Collapsible.Root>
    </Wrapper>
  ),
};
