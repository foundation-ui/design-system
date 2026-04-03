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

const Icon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      fill="currentColor"
      {...props}
    >
      <path
        fill="none"
        d="M20 6L9.71429 17L4 10.8889"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

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
export const VariantsWithIcon: Story = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content className="flex flex-column g-medium-30 align-center justify-center">
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button variant="accent">
              <span className="color-mono-white">With Icon</span>
              <Icon stroke="white" />
            </Button>
          </div>
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button variant="primary">
              With Icon
              <Icon stroke="var(--color-red)" />
            </Button>
            <Button variant="secondary">
              With Icon
              <Icon />
            </Button>
            <Button variant="tertiary">
              With Icon
              <Icon />
            </Button>
            <Button variant="mono">
              With Icon
              <Icon />
            </Button>
            <Button variant="border">
              With Icon
              <Icon />
            </Button>
          </div>
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button variant="hint">
              With Icon
              <Icon stroke="white" />
            </Button>
            <Button variant="meta">
              With Icon
              <Icon stroke="white" />
            </Button>
            <Button variant="success">
              With Icon
              <Icon stroke="white" />
            </Button>
            <Button variant="danger">
              With Icon
              <Icon stroke="white" />
            </Button>
            <Button variant="warning">
              With Icon
              <Icon stroke="black" />
            </Button>
          </div>
          <div className="flex align-center justify-center g-medium-30 flex-wrap">
            <Button variant="link">
              With Icon
              <Icon />
            </Button>
            <Button variant="ghost">
              With Icon
              <Icon />
            </Button>
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
