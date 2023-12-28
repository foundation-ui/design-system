import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from ".";
import { ButtonVariantEnum } from "../button";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);
`;

const meta = {
  title: "Components/Bases/Toggle",
  component: Toggle,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    raw: false,
    disabled: false,
    defaultChecked: false,
    onClick: () => console.log("click"),
    name: "toggle-demo",
  },

  render: ({ ...args }) => {
    const [checked, setChecked] = React.useState(args.defaultChecked);

    return (
      <Wrapper>
        <Toggle
          raw={args.raw}
          disabled={args.disabled}
          defaultChecked={args.defaultChecked}
          variant={
            checked ? ButtonVariantEnum.Secondary : ButtonVariantEnum.Tertiary
          }
          onClick={() => setChecked(!checked)}
        >
          Checked:<b>{String(checked)}</b>
        </Toggle>
      </Wrapper>
    );
  },
};
