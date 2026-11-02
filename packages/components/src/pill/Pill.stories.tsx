import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pill, Page, Badge } from "..";

const meta = {
  title: "Components/Pill",
  component: Pill,
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
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    container: "",
  },
  render: ({ ...args }) => <Pill />,
};
export const Sizes: Story = {
  args: {
    container: "",
  },
  render: ({ ...args }) => (
    <div className="flex g-medium-60">
      {["small", "medium", "large"].map((variant: any) => (
        <Pill sizing={variant} pulse />
      ))}
    </div>
  ),
};
export const Shapes: Story = {
  args: {
    container: "",
  },
  render: ({ ...args }) => (
    <div className="flex g-medium-60">
      {["square", "smooth", "round"].map((variant: any) => (
        <Pill shape={variant} pulse />
      ))}
    </div>
  ),
};
export const Statuses: Story = {
  args: {
    container: "",
  },
  render: ({ ...args }) => (
    <div className="flex g-medium-60">
      {["success", "warning", "danger"].map((variant: any) => (
        <Pill status={variant} pulse />
      ))}
    </div>
  ),
};
export const Custom: Story = {
  args: {
    container: "",
  },
  render: ({ ...args }) => (
    <div className="flex g-medium-60">
      <Pill color="var(--color-blue)" className="bg-blue" pulse />
      <Pill
        color="var(--color-indigo)"
        className="bg-indigo"
        pulse
        shape="square"
      />
      <Pill color="var(--color-yellow)" className="bg-yellow" />
      <Pill
        color="var(--color-magenta)"
        className="bg-magenta"
        pulse
        sizing="medium"
        shape="smooth"
      />
      <Pill color="var(--color-sky)" className="bg-sky" pulse />
    </div>
  ),
};
export const Fixed: Story = {
  args: {
    container: "",
  },
  render: ({ ...args }) => (
    <div className="flex flex-column g-medium-60">
      <Badge variant="success" sizing="small" shape="round">
        Fixed Pill
        <Pill status="success" fixed />
      </Badge>
      <Badge variant="warning" sizing="medium" shape="smooth">
        Fixed Pill
        <Pill status="warning" fixed shape="smooth" />
      </Badge>
      <Badge variant="danger" sizing="large" shape="square">
        Fixed Pill
        <Pill status="danger" fixed shape="square" />
      </Badge>
    </div>
  ),
};
