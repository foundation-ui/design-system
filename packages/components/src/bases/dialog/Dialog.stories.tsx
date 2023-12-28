import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from ".";
import { Button, ButtonVariantEnum } from "../button";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);
`;
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
    exitOnInteraction: true,
    open: false,
    raw: false,
  },

  render: ({ ...args }) => (
    <Wrapper>
      <div id="portal" />
      <Dialog.Root>
        <Dialog.Trigger
          variant={ButtonVariantEnum.Tertiary}
          onClick={() => console.log("Trigger clicked")}
        >
          Default Dialog
        </Dialog.Trigger>

        <Dialog.Portal container={args.container}>
          <Dialog open={args.open} raw={args.raw}>
            <h4>Dialog component</h4>
            <p>
              This Dialog comes from an open-source design system providing
              low-level components and foundations to help you build
              high-quality, accessible applications.
            </p>
            <Dialog.Menu raw={args.raw}>
              <Dialog.Control
                variant={ButtonVariantEnum.Secondary}
                onClick={() => console.log("Inner control clicked")}
              >
                Close
              </Dialog.Control>
              <Button variant={ButtonVariantEnum.Primary}>Continue</Button>
            </Dialog.Menu>
          </Dialog>
          <Dialog.Overlay
            raw={args.raw}
            exitOnInteraction={args.exitOnInteraction}
          />
        </Dialog.Portal>
      </Dialog.Root>
    </Wrapper>
  ),
};
