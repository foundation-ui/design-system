import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from ".";
import { ComponentSizeEnum, ComponentVariantEnum } from "../../../../../types";

const Wrapper = styled.div``;

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
    variant: ComponentVariantEnum.Tertiary,
    sizing: ComponentSizeEnum.Medium,
    defaultOpen: false,
    disabled: false,
    onClick: () => console.log("Click"),
    children: "Default Accordion content",
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
      <Accordion.Root>
        <Accordion>
          <Accordion.Trigger
            raw={args.raw}
            value={args.value}
            onClick={args.onClick}
            disabled={args.disabled}
            sizing={args.sizing}
            variant={args.variant}
          >
            Default Accordion
          </Accordion.Trigger>

          <Accordion.Content
            proximity
            spacing={ComponentSizeEnum.Large}
            defaultOpen={args.defaultOpen}
            value={args.value}
          >
            {args.children}
          </Accordion.Content>
        </Accordion>
      </Accordion.Root>
    </Wrapper>
  ),
};
