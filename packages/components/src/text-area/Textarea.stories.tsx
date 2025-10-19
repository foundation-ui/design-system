import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, Textarea } from "..";

/**
 * Textarea are used to allow users to write large chunks of text.
 */
const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    variant: "secondary",
  },
  render: ({ ...args }) => (
    <Page>
      <Page.Content className="p-large-30">
        <Textarea {...args} />
      </Page.Content>
    </Page>
  ),
};
