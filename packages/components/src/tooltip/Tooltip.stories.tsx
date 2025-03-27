import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "..";
import { ComponentSizeEnum } from "../../../../types";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Toolpire are used to convey additional information while hovering a component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is short and readable.
 *
 */
const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    raw: false,
    content: "",
    delay: 200,
    sizing: "small",
    children: "",
  },
  argTypes: {
    sizing: {
      options: [
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ],
      control: { type: "radio" },
    },
  },
  render: ({ ...args }) => (
    <div className="h-100 w-100 grid justify-center align-center">
      <p className="fs-medium-20 p-large-30">
        User analytics is applied in various&nbsp;
        <Tooltip content="Tooltips">
          <b>industries</b>
        </Tooltip>
        &nbsp;and settings to gain insights into user behavior and improve user
        experience. By analyzing user behavior,&nbsp;
        <Tooltip content="are">
          <b>organizations</b>
        </Tooltip>
        &nbsp;can identify areas where users may be experiencing difficulties or
        frustration, take steps to improve their product, and then, improve user
        experience. User analytics allows you to personalize experiences and
        better understand &nbsp;
        <Tooltip content="Great">
          <b>customer</b>
        </Tooltip>
        &nbsp; needs.
      </p>
    </div>
  ),
};
