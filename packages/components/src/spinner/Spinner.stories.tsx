import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, Spinner } from "..";

/**
 * Spinners are used to convey a pending state.
 */
const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  render: ({ ...args }) => (
    <Page>
      <Page.Content className="g-medium-60 flex align-center justify-center h-100 w-100">
        <Spinner sizing="small" {...args} />
        <Spinner sizing="medium" {...args} />
        <Spinner sizing="large" {...args} />
      </Page.Content>
    </Page>
  ),
};
