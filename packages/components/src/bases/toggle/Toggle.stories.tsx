import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from ".";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

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
// type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    raw: false,
    sizing: ComponentSizeEnum.Medium,
    disabled: false,
    defaultChecked: false,
    onClick: () => console.log("click"),
    name: "toggle-demo",
  },
  argTypes: {
    sizing: {
      options: [
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ],
      control: { type: "radio" },
    },
  },

  render: ({ ...args }) => {
    const [checked, setChecked] = React.useState(args.defaultChecked);

    return (
      <Wrapper>
        <Toggle
          raw={args.raw}
          variant={
            checked ? ComponentVariantEnum.Primary : ComponentVariantEnum.Border
          }
          sizing={args.sizing}
          disabled={args.disabled}
          defaultChecked={args.defaultChecked}
          onClick={() => setChecked(!checked)}
        >
          Checked:<b>{String(checked)}</b>
        </Toggle>
      </Wrapper>
    );
  },
};
