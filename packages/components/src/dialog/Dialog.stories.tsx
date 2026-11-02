import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Dialog, Divider, DropdownMenu, Field, Tooltip } from "..";
import { ComponentSizeEnum } from "../../../../types";

const Wrapper = styled.div``;
const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;
export default meta;

type Story = StoryObj<typeof meta>;

const DialogContent = () => {
  return (
    <React.Fragment>
      <Dialog.Menu className="flex justify-between align-center p-medium-30">
        <p className="fs-medium-20">Adipisicing elit</p>
      </Dialog.Menu>
      <Divider className="opacity-default-50" />

      <p className="fs-medium-10 p-medium-30 m-b-medium-60">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
        aliquid suscipit neque aperiam! Voluptatum non a incidunt asperiores
        sint maiores, molestias culpa fugiat nesciunt dolore nisi quae dolorum
        vitae autem?
      </p>

      <footer className="flex justify-between">
        <Dialog.Control variant="mono" sizing="medium">
          Close
        </Dialog.Control>
        <Dialog.Control variant="primary" sizing="medium">
          Continue
        </Dialog.Control>
      </footer>
    </React.Fragment>
  );
};

export const Default: Story = {
  args: {
    closeOnInteract: false,
    open: false,
    raw: false,
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
    <div className="flex align-center justify-center g-medium-30 flex-wrap">
      <Dialog.Root>
        <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
        <Dialog>
          <DialogContent />
        </Dialog>
        <Dialog.Overlay />
      </Dialog.Root>
    </div>
  ),
};

export const Small: Story = {
  args: {
    closeOnInteract: false,
    open: false,
    raw: false,
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
    <div className="flex align-center justify-center g-medium-30 flex-wrap">
      <Dialog.Root>
        <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
        <Dialog sizing="small" open>
          <DialogContent />
        </Dialog>
        <Dialog.Overlay />
      </Dialog.Root>
    </div>
  ),
};
export const Medium: Story = {
  args: {
    closeOnInteract: false,
    open: false,
    raw: false,
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
    <div className="flex align-center justify-center g-medium-30 flex-wrap">
      <Dialog.Root>
        <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
        <Dialog sizing="medium" open>
          <DialogContent />
        </Dialog>
        <Dialog.Overlay />
      </Dialog.Root>
    </div>
  ),
};
export const Large: Story = {
  args: {
    closeOnInteract: false,
    open: false,
    raw: false,
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
    <div className="flex align-center justify-center g-medium-30 flex-wrap">
      <Dialog.Root>
        <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
        <Dialog sizing="large" open>
          <DialogContent />
        </Dialog>
        <Dialog.Overlay />
      </Dialog.Root>
    </div>
  ),
};
export const DefaultOpen = {
  render: ({ ...args }) => (
    <div className="flex align-center justify-center g-medium-30 flex-wrap">
      <Dialog.Root>
        <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
        <Dialog open>
          <DialogContent />
        </Dialog>
        <Dialog.Overlay closeOnInteract />
      </Dialog.Root>
    </div>
  ),
};
export const NoOverlay = {
  render: ({ ...args }) => (
    <div className="flex align-center justify-center g-medium-30 flex-wrap">
      <Dialog.Root>
        <Dialog.Trigger>🐻‍❄️</Dialog.Trigger>
        <Dialog open>
          <DialogContent />
        </Dialog>
      </Dialog.Root>
    </div>
  ),
};
