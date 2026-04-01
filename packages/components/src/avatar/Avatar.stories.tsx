import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, Page, Tooltip } from "..";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
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
export const Badges: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      {["small", "medium", "large"].map((variant) => (
        <Avatar
          sizing={variant as "small"}
          alt="foundation-logo"
          src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
        >
          <Avatar.Badge
            alt="foundation-logo"
            src="https://www.untitledui.com/logos/images/Layers.jpg"
          />
        </Avatar>
      ))}
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
export const Shapes: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <Avatar shape="square" status="online" {...args} />
      <Avatar shape="smooth" status="online" {...args} />
      <Avatar shape="round" status="online" {...args} />
    </div>
  ),
};
export const Variants: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <Avatar />
      <Avatar
        alt="foundation-logo"
        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
      />
      <Avatar>
        <b className="fs-medium-10">AZ</b>
      </Avatar>
      <Avatar
        style={{ backgroundColor: "var(--color-purple)" }}
        status="online"
      >
        <span className="fs-small-30">Acme</span>
      </Avatar>
    </div>
  ),
};
