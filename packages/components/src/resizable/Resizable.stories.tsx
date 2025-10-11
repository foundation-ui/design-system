import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, Resizable } from "..";

/**
 * Resizable are used to render children into separated sections that can be resized by users.
 */
const meta = {
  title: "Components/Resizable",
  component: Resizable,
  tags: ["autodocs"],
} satisfies Meta<typeof Resizable>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    defaultWidth: 30,
    left: (
      <div
        className="h-100 w-100 flex align-center justify-center"
        style={{ borderRight: "1px solid var(--font-color-alpha-10)" }}
      >
        <p className="fs-medium-20">One</p>
      </div>
    ),
    right: (
      <div className="h-100 w-100 flex align-center justify-center">
        <p className="fs-medium-20">Two</p>
      </div>
    ),
  },
  render: ({ ...args }) => (
    <Page>
      <Page.Content>
        <Resizable {...args} />
      </Page.Content>
    </Page>
  ),
};
