import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from ".";
import { ComponentVariantEnum } from "../../../../../types";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);
`;

const meta = {
  title: "Components/Bases/Accordion",
  component: Accordion,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Accordion>;

export default meta;
export const Default = {
  args: {
    raw: false,
    defaultOpen: false,
    disabled: false,
    value: "demo-accordion",
    onClick: () => console.log("Click"),
    children: "Default Accordion content",
  },

  render: ({ ...args }) => (
    <Wrapper>
      <Accordion.Root>
        <Accordion>
          <Accordion.Trigger
            raw={args.raw}
            value={args.value}
            onClick={args.onClick}
            disabled={args.disabled}
            variant={ComponentVariantEnum.Tertiary}
          >
            Default Accordion
          </Accordion.Trigger>

          <Accordion.Content defaultOpen={args.defaultOpen} value={args.value}>
            {args.children}
          </Accordion.Content>
        </Accordion>
      </Accordion.Root>
    </Wrapper>
  ),
};
