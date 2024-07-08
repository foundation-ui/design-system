import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "..";
import { ComponentSizeEnum, ComponentVariantEnum } from "../../../../types";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Switch are toggle components that allows the user to turn a setting on or off.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive label for each switch.
 * - The interaction must have predictable behavior.
 */
const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    raw: false,
    defaultChecked: false,
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
    <Switch.Root>
      <Switch>
        <Switch.Thumb />
      </Switch>
    </Switch.Root>
  ),
};
export const DefaultChecked: Story = {
  render: ({ ...args }) => (
    <Switch.Root>
      <Switch defaultChecked>
        <Switch.Thumb />
      </Switch>
    </Switch.Root>
  ),
};
export const Sizes: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      {["large", "medium", "small"].map((item) => (
        <Switch.Root key={item}>
          <Switch sizing={item}>
            <Switch.Thumb />
          </Switch>
        </Switch.Root>
      ))}
    </div>
  ),
};
export const Variants: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      {["primary", "ghost"].map((item) => (
        <Switch.Root key={item}>
          <Switch name={item} variant={item}>
            <Switch.Thumb />
          </Switch>
          <label htmlFor={item}>
            <small>{item}</small>
          </label>
        </Switch.Root>
      ))}
    </div>
  ),
};
