import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, Spinner } from "..";

/**
 * Spinners are used to convey a pending state.
 */
const meta = {
  title: "Components/Spinner",
  component: Spinner,
  decorators: [
    (Story) => (
      <Page>
        <Page.Content className="p-medium-30">
          <div className="flex flex-column align-center justify-center h-100 g-medium-30">
            <Story />
          </div>
        </Page.Content>
      </Page>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  render: ({ ...args }) => (
    <React.Fragment>
      <div className="flex align-center g-medium-30">
        <Spinner sizing="small" {...args} />
        <Spinner sizing="medium" {...args} />
        <Spinner sizing="large" {...args} />
      </div>
    </React.Fragment>
  ),
};
export const Variants: Story = {
  args: {},
  render: ({ ...args }) => (
    <React.Fragment>
      {["circle", "circle-filled"].map((variant) => (
        <div className="flex align-center g-medium-30" key={variant}>
          <Spinner sizing="small" variant={variant} />
          <Spinner sizing="medium" variant={variant} />
          <Spinner sizing="large" variant={variant} />
        </div>
      ))}
    </React.Fragment>
  ),
};
