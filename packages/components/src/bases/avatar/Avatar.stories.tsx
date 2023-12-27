import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvataSizeEnum, AvataStatusEnum } from ".";

const meta = {
  title: "Components/Bases/Avatar",
  component: Avatar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "",
    alt: "",
    size: AvataSizeEnum.Small,
    status: AvataStatusEnum.Online,
    raw: false,
  },
  render: ({ ...args }) => <Avatar {...args} />,
};

export const WithURL: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/153380498?s=160&v=4",
    alt: "external-source-avatar",
    size: AvataSizeEnum.Small,
    status: AvataStatusEnum.Online,
  },
  render: ({ ...args }) => <Avatar {...args} />,
};
