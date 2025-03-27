import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Sheet } from "..";
import { ComponentSizeEnum, ComponentSideEnum } from "../../../../types";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Sheets are component that provides additional information in a top layer.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the content of the sheet.
 * - Ensure that the sheet is visible and accessible to all users, including those using assistive technologies.
 * - Use keyboard shortcuts to provide an alternative way of interacting with the sheet.
 * - Ensure that the sheet is responsive and adapts to different screen sizes and orientations.
 *
 */
const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default = {
  args: {
    raw: false,
    open: false,
    lock: false,
    overlay: false,
    closeOnInteract: false,
    shortcut: false,
    sizing: "small",
    side: "right",
    hotkey: "k",
    bindkey: null,
  },
  argTypes: {
    side: {
      options: [ComponentSideEnum.Right, ComponentSideEnum.Left],
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
    <Sheet.Root>
      <Sheet.Trigger>&hArr;</Sheet.Trigger>
      <Sheet>
        🐻‍❄️
        <Sheet.Trigger>&hArr;</Sheet.Trigger>
      </Sheet>
    </Sheet.Root>
  ),
};
export const DefaultOpen: Story = {
  render: ({ ...args }) => (
    <Sheet.Root>
      <Sheet.Trigger>&hArr;</Sheet.Trigger>
      <Sheet open lock={false}>
        🐻‍❄️
        <Sheet.Trigger>&hArr;</Sheet.Trigger>
      </Sheet>
    </Sheet.Root>
  ),
};
export const Shortcut: Story = {
  render: ({ ...args }) => (
    <Sheet.Root>
      <Sheet.Trigger>&hArr;</Sheet.Trigger>
      <Sheet shortcut bindkey="ctrlKey" hotkey="t">
        🐻‍❄️
        <Sheet.Trigger>&hArr;</Sheet.Trigger>
      </Sheet>
    </Sheet.Root>
  ),
};
