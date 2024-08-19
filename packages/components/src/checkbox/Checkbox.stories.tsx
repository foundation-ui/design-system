import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "..";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../types";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  argTypes: {
    variant: {
      options: [
        ComponentVariantEnum.Primary,
        ComponentVariantEnum.Mono,
        ComponentVariantEnum.Border,
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
    <Checkbox.Root>
      <Checkbox>
        <Checkbox.Indicator />
      </Checkbox>
    </Checkbox.Root>
  ),
};
export const DefaultChecked: Story = {
  render: ({ ...args }) => (
    <Checkbox.Root>
      <Checkbox defaultChecked onChange={() => null}>
        <Checkbox.Indicator />
      </Checkbox>
    </Checkbox.Root>
  ),
};
export const Group: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      {[false, false, true].map((item: boolean, key: number) => (
        <Checkbox.Root key={`${item}-${key}`}>
          <Checkbox defaultChecked={item} onChange={() => null}>
            <Checkbox.Indicator />
          </Checkbox>
        </Checkbox.Root>
      ))}
    </div>
  ),
};
export const Sizes: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      {["large", "medium", "small"].map((item: string) => (
        <Checkbox.Root key={item}>
          <Checkbox sizing={item} onChange={() => null}>
            <Checkbox.Indicator />
          </Checkbox>
        </Checkbox.Root>
      ))}
    </div>
  ),
};
export const Variants: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      {["primary", "mono", "border", "ghost"].map((item: string) => (
        <Checkbox.Root key={item}>
          <Checkbox name={item} variant={item}>
            <Checkbox.Indicator />
          </Checkbox>
          <label id={`${item}-label`} htmlFor={item}>
            <small>{item}</small>
          </label>
        </Checkbox.Root>
      ))}
    </div>
  ),
};
