import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from ".";

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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "default-checkbox",
    value: "checked",
    defaultChecked: true,
    disabled: false,
    onChange: () => console.log("Changed"),
    onClick: () => console.log("Clicked"),
    children: "Default Checkbox",
    raw: false,
  },
  render: ({ ...args }) => (
    <Wrapper>
      <Checkbox.Root>
        <label style={{ display: "flex", alignItems: "center" }}>
          <Checkbox {...args}>
            <Checkbox.Indicator />
          </Checkbox>
          {args.children}
        </label>
      </Checkbox.Root>
    </Wrapper>
  ),
};
