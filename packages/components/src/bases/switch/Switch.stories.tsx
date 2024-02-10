import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from ".";
import { ComponentSizeEnum, ComponentVariantEnum } from "../../../../../types";

const Wrapper = styled.div``;
const meta = {
  title: "Components/Bases/Switch",
  component: Switch,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Switch>;

export default meta;
export const Default = {
  args: {
    // raw: false,
    variant: ComponentVariantEnum.Primary,
    sizing: ComponentSizeEnum.Medium,
    defaultChecked: false,
    disabled: false,
    onClick: () => console.log("clicked"),
  },
  argTypes: {
    variant: {
      options: [ComponentVariantEnum.Primary, ComponentVariantEnum.Ghost],
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
      <Switch.Root>
        <label id="label" htmlFor="switch-demo">
          Default Switch&nbsp;
        </label>
        <Switch
          raw={args.raw}
          sizing={args.sizing}
          variant={args.variant}
          id="switch-demo"
          defaultChecked={args.defaultChecked}
          disabled={args.disabled}
          onClick={args.onClick}
          aria-labelledby="label"
        >
          <Switch.Thumb raw={args.raw} />
        </Switch>
      </Switch.Root>
    </Wrapper>
  ),
};
