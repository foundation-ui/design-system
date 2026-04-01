import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Page } from "..";

const meta = {
  title: "Components/Button",
  component: Button,
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
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => <Button {...args} />,
};
export const Sizes: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex g-medium-30">
        <Button sizing="large">Large</Button>
        <Button sizing="medium">Medium</Button>
        <Button sizing="small">Small</Button>
      </div>
    );
  },
};
export const Shapes: Story = {
  render: ({ ...args }) => {
    return (
      <div className="flex g-medium-30">
        <Button shape="square">Square</Button>
        <Button shape="smooth">Smooth</Button>
        <Button shape="round">Round</Button>
      </div>
    );
  },
};
export const Variants: Story = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content className="flex flex-column g-medium-30 align-center justify-center">
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button variant="accent">
              <span className="color-mono-white">Accent</span>
            </Button>
          </div>
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="mono">Mono</Button>
            <Button variant="border">Border</Button>
          </div>
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button variant="hint">Hint</Button>
            <Button variant="meta">Meta</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="warning">Warning</Button>
          </div>
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button variant="link">Link</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Page.Content>
      </Page>
    );
  },
};
export const Animations: Story = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content className="flex flex-column g-medium-30 align-center justify-center">
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button animation="reflective" variant="accent">
              <span className="color-mono-white">Accent</span>
            </Button>
          </div>
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button animation="reflective" variant="primary">
              Primary
            </Button>
            <Button animation="reflective" variant="secondary">
              Secondary
            </Button>
            <Button animation="reflective" variant="tertiary">
              Tertiary
            </Button>
            <Button animation="reflective" variant="mono">
              Mono
            </Button>
            <Button animation="reflective" variant="border">
              Border
            </Button>
          </div>
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button animation="reflective" variant="hint">
              Hint
            </Button>
            <Button animation="reflective" variant="meta">
              Meta
            </Button>
            <Button animation="reflective" variant="success">
              Success
            </Button>
            <Button animation="reflective" variant="danger">
              Danger
            </Button>
            <Button animation="reflective" variant="warning">
              Warning
            </Button>
          </div>
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button variant="link">Link</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Page.Content>
      </Page>
    );
  },
};
