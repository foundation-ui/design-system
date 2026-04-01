import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Divider, DropdownMenu, Page } from "..";
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
      <Page>
        <Page.Content className="p-medium-30 flex align-center justify-center w-100 h-100">
          <Story />
        </Page.Content>
      </Page>
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
      <DropdownMenu>
        <DropdownMenu.Trigger variant="secondary">Actions</DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="flex justify-between align-center">
            Cut
            <Badge variant="border">
              <span className="fs-small-50">⌘X</span>
            </Badge>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex justify-between align-center">
            Copy
            <Badge variant="border">
              <span className="fs-small-50">⌘C</span>
            </Badge>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex justify-between align-center">
            Paste
            <Badge variant="border">
              <span className="fs-small-50">⌘V</span>
            </Badge>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  ),
};
export const RadioItem: Story = {
  render: ({ ...args }) => (
    <DropdownMenu.Root>
      <DropdownMenu>
        <DropdownMenu.Trigger variant="secondary">Actions</DropdownMenu.Trigger>

        <DropdownMenu.Content className="flex flex-column g-small-60">
          <DropdownMenu.Item
            className="flex justify-between align-center"
            radio
          >
            Cut
            <Badge variant="border">
              <span className="fs-small-50">⌘X</span>
            </Badge>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex justify-between align-center"
            radio
          >
            Copy
            <Badge variant="border">
              <span className="fs-small-50">⌘C</span>
            </Badge>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex justify-between align-center"
            radio
          >
            Paste
            <Badge variant="border">
              <span className="fs-small-50">⌘V</span>
            </Badge>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  ),
};
