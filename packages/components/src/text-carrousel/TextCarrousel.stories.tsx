import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TextCarrousel, Page } from "..";

const meta = {
  title: "Components/TextCarrousel",
  component: TextCarrousel,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof TextCarrousel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: ({ ...args }) => (
    <p className="fs-medium-10">
      <TextCarrousel
        auto
        content={[
          "Messages shuffle automatically.",
          "The default interval is set to 3 seconds.",
        ]}
      />
    </p>
  ),
};
export const ShuffleOnClick: Story = {
  args: {},
  render: ({ ...args }) => (
    <p className="fs-medium-10">
      <TextCarrousel
        auto={false}
        content={[
          "Message shuffle on click.",
          "The message queue remains the same.",
        ]}
      />
    </p>
  ),
};
