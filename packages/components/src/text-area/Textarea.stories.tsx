import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Field, Page, Textarea } from "..";
import { TComponentSize } from "../../../../types";

/**
 * Textarea are used to allow users to write large chunks of text.
 */
const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Page>
        <Page.Content className="p-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Textarea>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    variant: "secondary",
    resizable: false,
  },
  render: ({ ...args }) => (
    <div className="flex flex-column align-center justify-center h-100 g-medium-30">
      <Field.Wrapper style={{ width: 325 }}>
        <Textarea />
      </Field.Wrapper>
    </div>
  ),
};
export const Sizes: Story = {
  args: {
    variant: "secondary",
    resizable: false,
  },
  render: ({ ...args }) => (
    <div className="flex flex-column align-center justify-center h-100 g-medium-30">
      {["small", "medium", "large"].map((item) => (
        <Field.Wrapper key={item} style={{ width: 325 }}>
          <Textarea sizing={item} />
        </Field.Wrapper>
      ))}
    </div>
  ),
};
export const Variants: Story = {
  args: {
    variant: "secondary",
    resizable: false,
  },
  render: ({ ...args }) => (
    <div className="flex flex-column align-center justify-center h-100 g-medium-30">
      {["primary", "secondary", "ghost"].map((item) => (
        <Field.Wrapper key={item} style={{ width: 325 }}>
          <Textarea variant={item} />
        </Field.Wrapper>
      ))}
    </div>
  ),
};
