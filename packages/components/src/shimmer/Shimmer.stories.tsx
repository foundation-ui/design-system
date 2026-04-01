import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page, Shimmer } from "..";

const meta = {
  title: "Components/Shimmer",
  component: Shimmer,
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
} satisfies Meta<typeof Shimmer>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Loading your content…",
    duration: 2,
    spread: 200,
    shimmerColor: "var(--font-color-alpha-60)",
    baseColor: "var(--font-color-alpha-30)",
  },
  argTypes: {
    duration: {
      control: { type: "number", min: 0.5, max: 10, step: 0.5 },
    },
    spread: {
      control: { type: "number", min: 100, max: 500, step: 50 },
    },
    shimmerColor: {
      control: { type: "color" },
    },
    baseColor: {
      control: { type: "color" },
    },
  },
  render: ({ ...args }) => <Shimmer {...args} />,
};

export const SlowAnimation: Story = {
  render: ({ ...args }) => (
    <Shimmer duration={6} spread={200}>
      Slowly shimmering text…
    </Shimmer>
  ),
};

export const FastAnimation: Story = {
  render: ({ ...args }) => (
    <Shimmer duration={0.8} spread={200}>
      Rapidly shimmering text…
    </Shimmer>
  ),
};

export const WideSpread: Story = {
  render: ({ ...args }) => (
    <Shimmer spread={400}>Wide spread shimmer effect</Shimmer>
  ),
};

export const CustomColors: Story = {
  render: ({ ...args }) => (
    <Shimmer
      shimmerColor="var(--alpha-blue-80)"
      baseColor="var(--alpha-blue-30)"
    >
      Custom branded shimmer
    </Shimmer>
  ),
};

export const Group: Story = {
  render: ({ ...args }) => (
    <React.Fragment>
      {[
        "Fetching user profile…",
        "Loading dashboard…",
        "Syncing your data…",
        "Preparing your workspace…",
      ].map((label) => (
        <div key={label} className="m-b-medium-30">
          <Shimmer>{label}</Shimmer>
        </div>
      ))}
    </React.Fragment>
  ),
};
