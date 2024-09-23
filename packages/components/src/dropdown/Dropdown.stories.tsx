import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DropdownMenu } from "..";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../types";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Dropdown are used to expand and collapse list of actions.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the dropdown menu content.
 * - Ensure that the dropdown menu can be opened and closed using the keyboard.
 * - Ensure that the dropdown menu is visibly focused when opened using the keyboard.
 * - Ensure that the dropdown menu is dismissed when the user clicks outside of it or presses the Esc key.
 *
 */
const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownMenu>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    raw: false,
    container: "",
    defaultOpen: false,
    radio: false,
    disabled: false,
  },
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>🐻‍❄️</DropdownMenu.Trigger>
      <DropdownMenu>
        <DropdownMenu.Content>
          {["🐻", "🐻‍❄️", "🦊", "🐱", "🐶"].map((item) => (
            <DropdownMenu.Item key={item}>{item}</DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  ),
};
export const DefaultOpen: Story = {
  render: ({ ...args }) => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>🐻‍❄️</DropdownMenu.Trigger>
      <DropdownMenu>
        <DropdownMenu.Content defaultOpen>
          <DropdownMenu.Item>🐻🐻‍❄️🦊🐱🐶</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  ),
};
export const RadioItem: Story = {
  render: ({ ...args }) => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>🐻‍❄️</DropdownMenu.Trigger>
      <DropdownMenu>
        <DropdownMenu.Content>
          <DropdownMenu.Item radio>🐻🐻‍❄️🦊🐱🐶</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  ),
};
