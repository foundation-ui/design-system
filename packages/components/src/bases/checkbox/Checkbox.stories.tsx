import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from ".";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);

  label {
    display: flex;
    align-items: flex-start;
    gap: var(--measurement-medium-10);
  }
`;

const meta = {
  title: "Components/Bases/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    raw: false,
    variant: ComponentVariantEnum.Tertiary,
    sizing: ComponentSizeEnum.Medium,
    name: "default-checkbox",
    value: "checked",
    defaultChecked: true,
    disabled: false,
    onChange: () => console.log("Changed"),
    onClick: () => console.log("Clicked"),
    children: "Default Checkbox",
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
      <Checkbox.Root>
        <label style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            raw={args.raw}
            variant={args.variant}
            sizing={args.sizing}
            name={args.name}
            value={args.value}
            disabled={args.disabled}
            defaultChecked={args.defaultChecked}
            onChange={args.onChange}
            onClick={args.onClick}
          >
            <Checkbox.Indicator />
          </Checkbox>
          {args.children}
        </label>
      </Checkbox.Root>
    </Wrapper>
  ),
};
