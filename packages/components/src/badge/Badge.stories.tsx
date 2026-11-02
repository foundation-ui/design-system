import React from "react";

import { Badge, Page, Pill } from "../";
import type { Meta, StoryObj } from "@storybook/react";

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
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => <Badge {...args}>Badge</Badge>,
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
export const Emphasis: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex g-medium-30">
        <Badge emphasis variant="primary">
          Primary
        </Badge>
        <Badge emphasis variant="secondary">
          Secondary
        </Badge>
        <Badge emphasis variant="border">
          Border
        </Badge>
        <Badge emphasis variant="meta">
          Meta
        </Badge>
        <Badge emphasis variant="hint">
          Hint
        </Badge>
        <Badge emphasis variant="success">
          Success
        </Badge>
        <Badge emphasis variant="warning">
          Warning
        </Badge>
        <Badge emphasis variant="danger">
          Error
        </Badge>
      </div>
    );
  },
};
export const WithPill: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex g-medium-30">
        <Badge variant="primary">
          <Pill status="success" />
          Primary
        </Badge>
        <Badge variant="secondary">
          <Pill status="warning" />
          Secondary
        </Badge>
        <Badge variant="border">
          <Pill status="danger" />
          Border
        </Badge>
        <Badge variant="meta">
          <Pill color="var(--color-indigo)" className="bg-indigo" pulse />
          Meta
        </Badge>
        <Badge variant="hint">
          <Pill color="var(--color-purple)" className="bg-purple" pulse />
          Hint
        </Badge>
        <Badge variant="success">
          <Pill status="success" />
          Success
        </Badge>
        <Badge variant="warning">
          <Pill status="warning" />
          Warning
        </Badge>
        <Badge variant="danger">
          <Pill status="danger" />
          Error
        </Badge>
      </div>
    );
  },
};
