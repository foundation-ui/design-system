import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, Container } from "../../";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const meta = {
  title: "Components/Bases/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
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
        ComponentVariantEnum.Secondary,
        ComponentVariantEnum.Tertiary,
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
      <Checkbox defaultChecked>
        <Checkbox.Indicator />
      </Checkbox>
    </Checkbox.Root>
  ),
};
export const Group: Story = {
  render: ({ ...args }) => (
    <Container.Row spacing="large">
      {[false, false, true].map((item: boolean) => (
        <Checkbox.Root>
          <Checkbox defaultChecked={item}>
            <Checkbox.Indicator />
          </Checkbox>
        </Checkbox.Root>
      ))}
    </Container.Row>
  ),
};
export const Sizes: Story = {
  render: ({ ...args }) => (
    <Container.Row spacing="large">
      {["large", "medium", "small"].map((item: string) => (
        <Checkbox.Root>
          <Checkbox sizing={item}>
            <Checkbox.Indicator />
          </Checkbox>
        </Checkbox.Root>
      ))}
    </Container.Row>
  ),
};
export const Variants: Story = {
  render: ({ ...args }) => (
    <Container.Row spacing="large">
      {["primary", "secondary", "tertiary", "mono", "border", "ghost"].map(
        (item: string) => (
          <Checkbox.Root>
            <Checkbox name={item} variant={item}>
              <Checkbox.Indicator />
            </Checkbox>
            <label id={`${item}-label`} htmlFor={item}>
              <small>{item}</small>
            </label>
          </Checkbox.Root>
        )
      )}
    </Container.Row>
  ),
};
