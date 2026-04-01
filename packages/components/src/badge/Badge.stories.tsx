import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./";
import { Page } from "..";
import { ComponentSizeEnum } from "../../../../types";

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
      <Page>
        <Page.Content className="p-medium-30">
          <Story />
        </Page.Content>
      </Page>
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
      <div className="flex flex column g-medium-30">
        <Badge shape="square">Square</Badge>
        <Badge shape="smooth">Smooth</Badge>
        <Badge shape="round">Round</Badge>
      </div>
    );
  },
};
export const Sizes: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex align-start g-medium-30">
        <Badge variant="border" sizing="small">
          Label
        </Badge>
        <Badge variant="border" sizing="medium">
          Label
        </Badge>
        <Badge variant="border" sizing="large">
          Label
        </Badge>
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
        <Badge variant="hint">Hint</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Error</Badge>
      </div>
    );
  },
};
