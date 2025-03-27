import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Badges are used to convey data or states to the users.
 *
 * **Best practices:**
 *
 * - Define the hierarchy of badges with different variants.
 * - Badge label must convey short and understandable information.
 *
 */

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => <Badge {...args} />,
};
export const Shapes: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex g-medium-30">
        <Badge shape="square">Square</Badge>
        <Badge shape="smooth">Smooth</Badge>
        <Badge shape="round">Round</Badge>
      </div>
    );
  },
};
export const Variants: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex g-medium-30">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="border">Border</Badge>
        <Badge variant="meta">Meta</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    );
  },
};
