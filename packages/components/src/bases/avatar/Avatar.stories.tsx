import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, Container } from "../../";

const meta = {
  title: "Components/Bases/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
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
    <Container.Row spacing="large">
      <Avatar status="online" {...args} />
      <Avatar status="away" {...args} />
      <Avatar status="busy" {...args} />
      <Avatar status="offline" {...args} />
      <Avatar {...args} />
    </Container.Row>
  ),
};
export const Sizes: Story = {
  render: ({ ...args }) => (
    <Container.Row spacing="large">
      <Avatar sizing="large" {...args} />
      <Avatar sizing="medium" {...args} />
      <Avatar sizing="small" {...args} />
    </Container.Row>
  ),
};
export const Variants: Story = {
  render: ({ ...args }) => (
    <Container.Row spacing="large">
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
    </Container.Row>
  ),
};
