import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, PrivacyField } from "..";

/**
 * PrivacyFields are used to hide sensitive values typed by users.
 */
const meta = {
  title: "Components/PrivacyField",
  component: PrivacyField,
  tags: ["autodocs"],
} satisfies Meta<typeof PrivacyField>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    variant: "secondary",
    textIcon: <p className="fs-small-60">txt</p>,
    passwordIcon: <p className="fs-small-60">pwd</p>,
  },
  render: ({ ...args }) => (
    <Page>
      <Page.Content className="p-large-30">
        <PrivacyField {...args} />
      </Page.Content>
    </Page>
  ),
};
