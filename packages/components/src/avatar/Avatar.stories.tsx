import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "..";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Avatar>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => <Avatar {...args} />,
};
export const Status: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <Avatar status="online" {...args} />
      <Avatar status="away" {...args} />
      <Avatar status="busy" {...args} />
      <Avatar status="offline" {...args} />
      <Avatar {...args} />
    </div>
  ),
};
export const Sizes: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <Avatar sizing="large" {...args} />
      <Avatar sizing="medium" {...args} />
      <Avatar sizing="small" {...args} />
    </div>
  ),
};
export const Variants: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <Avatar />
      <Avatar
        alt="foundation-logo"
        src="https://avatars.githubusercontent.com/u/153380498?s=200&v=4"
      />
      <Avatar>
        <b>AZ</b>
      </Avatar>
      <Avatar
        style={{ backgroundColor: "var(--color-purple)" }}
        status="online"
      >
        <small>Acme</small>
      </Avatar>
    </div>
  ),
};
