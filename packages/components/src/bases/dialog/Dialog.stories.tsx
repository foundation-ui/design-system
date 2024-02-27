import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Dialog } from ".";
import { Button, Portal } from "../../";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const Wrapper = styled.div``;
const meta = {
  title: "Components/Bases/Dialog",
  component: Dialog,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Dialog>;

export default meta;

export const Default = {
  args: {
    container: "portal",
    closeOnInteract: true,
    open: false,
    raw: false,
    sizing: ComponentSizeEnum.Medium,
  },
  argTypes: {
    sizing: {
      options: [
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ],
      control: { type: "radio" },
    },
  },
  render: ({ ...args }) => (
    <Wrapper>
      <div id="portal" />
      <Dialog.Root>
        <Dialog.Trigger
          variant={ComponentVariantEnum.Tertiary}
          onClick={() => console.log("Trigger clicked")}
        >
          Default Dialog
        </Dialog.Trigger>

        <Portal container={args.container}>
          <Dialog open={args.open} raw={args.raw} sizing={args.sizing}>
            <h4>Dialog component</h4>
            <p>
              This Dialog comes from an open-source design system providing
              low-level components and foundations to help you build
              high-quality, accessible applications.
            </p>
            <Dialog.Menu raw={args.raw}>
              <Dialog.Control
                variant={ComponentVariantEnum.Secondary}
                onClick={() => console.log("Inner control clicked")}
              >
                Close
              </Dialog.Control>
              <Button variant={ComponentVariantEnum.Primary}>Continue</Button>
            </Dialog.Menu>
          </Dialog>
          <Dialog.Overlay
            raw={args.raw}
            closeOnInteract={args.closeOnInteract}
          />
        </Portal>
      </Dialog.Root>
    </Wrapper>
  ),
};
