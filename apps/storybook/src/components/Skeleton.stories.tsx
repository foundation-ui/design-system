import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, Skeleton } from "@usefui/components";

/**  */
const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  render: ({ ...args }) => (
    <React.Fragment>
      <div className="flex align-center justify-center ">
        <Skeleton sizing="small" />
        <Skeleton sizing="medium" />
        <Skeleton sizing="large" />
      </div>
      <div className="flex align-center justify-center">
        <Skeleton shape="square" />
        <Skeleton shape="smooth" />
        <Skeleton shape="round" />
      </div>
    </React.Fragment>
  ),
};
