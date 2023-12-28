import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from ".";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);
`;
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
    raw: false,
    defaultChecked: false,
    disabled: false,
    onClick: () => console.log("clicked"),
  },

  render: ({ ...args }) => (
    <Wrapper>
      <Switch.Root>
        <label id="label" htmlFor="switch-demo">
          Default Switch&nbsp;
        </label>
        <Switch
          raw={args.raw}
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
