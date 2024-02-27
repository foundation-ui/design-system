import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Overlay } from ".";
import { Container } from "../../";

const meta = {
  title: "Components/Layers/Overlay",
  component: Overlay,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Overlay>;

export default meta;

export const Default = {
  args: {
    raw: false,
    visible: true,
    closeOnInteract: true,
  },
  argTypes: {},
  render: ({ ...args }) => (
    <React.Fragment>
      <Overlay
        raw={args.raw}
        visible={args.visible}
        closeOnInteract={args.closeOnInteract}
      />
      <Container.Col>
        <b>Foundation UI</b>
        <small style={{ opacity: 0.3 }}>Overlay component</small>
      </Container.Col>
    </React.Fragment>
  ),
};
