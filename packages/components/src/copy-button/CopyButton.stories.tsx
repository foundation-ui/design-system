import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, CopyButton } from "..";

/**
 * CopyButton are used to copy stored values when clicked.
 */
const meta = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
} satisfies Meta<typeof CopyButton>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    value: "Hello, world!",
  },
  render: ({ ...args }) => (
    <Page>
      <Page.Content className="p-large-30">
        <CopyButton variant="border" sizing="medium" {...args}>
          Click to copy
        </CopyButton>
      </Page.Content>
    </Page>
  ),
};
