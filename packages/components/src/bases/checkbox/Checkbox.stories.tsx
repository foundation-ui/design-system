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

export const Controlled: Story = {
  args: {
    name: "controlled-checkbox",
    value: "checked",
    disabled: false,
    required: false,
    onChange: () => console.log("Changed"),
    onClick: () => console.log("Clicked"),
    children: "Controlled Checkbox",
  },
  render: ({ ...args }) => (
    <Wrapper>
      <Checkbox.Root>
        <label>
          <Checkbox {...args}>
            <Checkbox.Indicator />
          </Checkbox>
          {args.children}
        </label>
      </Checkbox.Root>
    </Wrapper>
  ),
};

export const Uncontrolled: Story = {
  args: {
    name: "uncontrolled-checkbox",
    defaultChecked: true,
    disabled: false,
    required: false,
    children: "Uncontrolled Checkbox",
  },
  render: ({ ...args }) => (
    <Wrapper>
      <Checkbox.Root>
        <label>
          <Checkbox {...args} onChange={() => console.log("change")}>
            <Checkbox.Indicator />
          </Checkbox>
          {args.children}
        </label>
      </Checkbox.Root>
    </Wrapper>
  ),
};
