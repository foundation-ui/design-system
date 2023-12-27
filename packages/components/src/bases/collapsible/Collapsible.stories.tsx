import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from ".";
import { ButtonVariantEnum } from "../button";

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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOpen: false,
    showFirstChild: true,
    onClick: () => console.log("Click"),
    children: "Default collapsible",
  },

  render: ({ ...args }) => (
    <Wrapper>
      <Collapsible.Root>
        <Collapsible>
          <Collapsible.Trigger
            variant={ButtonVariantEnum.Ghost}
            onClick={() => args.onClick}
          >
            {args.children}
          </Collapsible.Trigger>
          <Collapsible.Content
            defaultOpen={args.defaultOpen}
            showFirstChild={args.showFirstChild}
          >
            <small>Item 1&nbsp;</small>
            <small>Item 2&nbsp;</small>
            <small>Item 3</small>
          </Collapsible.Content>
        </Collapsible>
      </Collapsible.Root>
    </Wrapper>
  ),
};
