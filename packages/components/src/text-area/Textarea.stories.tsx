import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page, Textarea } from "..";
import { TComponentSize } from "../../../../types";

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
    resizable: false,
  },
  render: ({ ...args }) => (
    <Page>
      <Page.Content className="p-large-30 flex flex-column g-large-10">
        {["small", "medium", "large"].map((size) => (
          <Textarea key={size} sizing={size as TComponentSize} {...args} />
        ))}
      </Page.Content>
    </Page>
  ),
};
