import React from "react";
import { Field, ProgressBar } from "@usefui/components";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  decorators: [(Story: any) => <Story />],
  args: {
    consumption: 10,
    remaining: 1,
    percentage: 0.9,
    threshold: 0.3,
  },
  argTypes: {
    percentage: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
    threshold: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
  },
};
export default meta;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Field.Wrapper>{children}</Field.Wrapper>
);

export const Empty = {
  args: { consumption: 0, remaining: 10, percentage: 0 },
  render: (args: any) => (
    <Wrapper>
      <ProgressBar {...args} />
    </Wrapper>
  ),
};

export const BelowThreshold = {
  args: { consumption: 2, remaining: 8, percentage: 0.2 },
  render: (args: any) => (
    <Wrapper>
      <ProgressBar {...args} />
    </Wrapper>
  ),
};

export const AboveThreshold = {
  args: { consumption: 7, remaining: 3, percentage: 0.7 },
  render: (args: any) => (
    <Wrapper>
      <ProgressBar {...args} />
    </Wrapper>
  ),
};

export const Full = {
  args: { consumption: 10, remaining: 0, percentage: 1 },
  render: (args: any) => (
    <Wrapper>
      <ProgressBar {...args} />
    </Wrapper>
  ),
};
