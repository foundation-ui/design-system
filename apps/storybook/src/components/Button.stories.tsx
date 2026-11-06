import React from "react";

import { Button, Page, Tooltip } from "@usefui/components";
import { Icon } from "@usefui/icons";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex flex-column align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
};
export default meta;

export const Default = {
  render: ({ ...args }) => <Button {...args}>Button</Button>,
};

export const Sizes = {
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
export const Shapes = {
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

export const Variants = {
  render: ({ ...args }) => {
    return (
      <div className="flex align-center justify-center g-medium-10 flex-wrap">
        {[
          "Accent",
          "Primary",
          "Secondary",
          "Tertiary",
          "Mono",
          "Border",
          "Success",
          "Warning",
          "Danger",
          "Meta",
          "Hint",
          "Ghost",
          "Link",
        ].map((variant) => (
          <Tooltip variant="secondary" content={variant}>
            <Button
              variant={variant.toLowerCase() as any}
              sizing="small"
              shape="round"
            >
              <Icon className="m-y-small-80" opacity={0.6}>
                <Icon.ColorSwatch />
              </Icon>
            </Button>
          </Tooltip>
        ))}
      </div>
    );
  },
};
export const Animations = {
  render: ({ ...args }) => {
    return (
      <div className="flex align-center justify-center g-medium-10 flex-wrap">
        {[
          "Reflective",
          "Float",
          "Scale",
          "Bounce",
          "Shake",
          "Wiggle",
          "Lift",
        ].map((animation) => (
          <Tooltip variant="secondary" content={animation}>
            <Button
              variant="secondary"
              sizing="small"
              shape="round"
              animation={animation.toLowerCase() as any}
            >
              <Icon className="m-y-small-80" opacity={0.6}>
                <Icon.Like />
              </Icon>
            </Button>
          </Tooltip>
        ))}
      </div>
    );
  },
};

export const Sound = {
  render: ({ ...args }) => {
    return (
      <div className="flex align-center justify-center g-medium-10 flex-wrap">
        {[
          "Click",
          "Tick",
          "Success",
          "Error",
          "Toggle",
          "Pop",
          "Navigate",
          "Select",
          "Slide",
          "Notification",
          "Delete",
        ].map((s) => (
          <Tooltip variant="secondary" content={s}>
            <Button
              animation="scale"
              variant="secondary"
              sizing="small"
              shape="round"
              sound={s.toLowerCase() as any}
            >
              <Icon className="m-y-small-80" opacity={0.6}>
                <Icon.TriangleRight />
              </Icon>
            </Button>
          </Tooltip>
        ))}
      </div>
    );
  },
};
