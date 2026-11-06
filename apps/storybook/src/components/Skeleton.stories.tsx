import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, Skeleton } from "@usefui/components";

/**  */
const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30 p-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Skeleton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: ({ ...args }) => <Skeleton />,
};

export const Sizes: Story = {
  args: {},
  render: ({ ...args }) => (
    <React.Fragment>
      <div className="flex w-100 h-100 flex-column w-100 g-medium-30 align-center justify-center ">
        <Skeleton sizing="small" />
        <Skeleton sizing="medium" />
        <Skeleton sizing="large" />
        <Skeleton sizing="large" className="h-100" />
      </div>
    </React.Fragment>
  ),
};

export const Shapes: Story = {
  args: {},
  render: ({ ...args }) => (
    <React.Fragment>
      <div className="flex flex-column w-100 g-medium-30  align-center justify-center">
        <Skeleton shape="square" />
        <Skeleton shape="smooth" />
        <Skeleton shape="round" />
      </div>
    </React.Fragment>
  ),
};
