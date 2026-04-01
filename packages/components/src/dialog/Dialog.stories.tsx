import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Dialog, Divider, DropdownMenu, Field, Page, Tooltip } from "..";
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
      <Dialog.Menu className="align-center ">
        <Field.Root>
          <Field variant="ghost" sizing="medium" placeholder="Search" />
        </Field.Root>
        <Tooltip content="Close">
          <Dialog.Control variant="ghost">⏎</Dialog.Control>
        </Tooltip>
      </Dialog.Menu>
      <Divider className="opacity-default-50" />
      <DropdownMenu.Item className="flex justify-between align-center">
        Cut
        <Badge variant="border">
          <span className="fs-small-50">⌘X</span>
        </Badge>
      </DropdownMenu.Item>

      <DropdownMenu.Item className="flex justify-between align-center">
        Copy
        <Badge variant="border">
          <span className="fs-small-50">⌘C</span>
        </Badge>
      </DropdownMenu.Item>

      <DropdownMenu.Item className="flex justify-between align-center">
        Paste
        <Badge variant="border">
          <span className="fs-small-50">⌘V</span>
        </Badge>
      </DropdownMenu.Item>
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
    <Page>
      <Page.Content className="flex flex-column g-medium-30 align-center justify-center">
        <div className="flex align-center justify-center g-medium-30 flex-wrap">
          <Dialog.Root>
            <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
            <Dialog>
              <DialogContent />
            </Dialog>
            <Dialog.Overlay />
          </Dialog.Root>
        </div>
      </Page.Content>
    </Page>
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
    <Page>
      <Page.Content className="flex flex-column g-medium-30 align-center justify-center">
        <div className="flex align-center justify-center g-medium-30 flex-wrap">
          <Dialog.Root>
            <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
            <Dialog sizing="small" open>
              <DialogContent />
            </Dialog>
            <Dialog.Overlay />
          </Dialog.Root>
        </div>
      </Page.Content>
    </Page>
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
    <Page>
      <Page.Content className="flex flex-column g-medium-30 align-center justify-center">
        <div className="flex align-center justify-center g-medium-30 flex-wrap">
          <Dialog.Root>
            <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
            <Dialog sizing="medium" open>
              <DialogContent />
            </Dialog>
            <Dialog.Overlay />
          </Dialog.Root>
        </div>
      </Page.Content>
    </Page>
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
    <Page>
      <Page.Content className="flex flex-column g-medium-30 align-center justify-center">
        <div className="flex align-center justify-center g-medium-30 flex-wrap">
          <Dialog.Root>
            <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
            <Dialog sizing="large" open>
              <DialogContent />
            </Dialog>
            <Dialog.Overlay />
          </Dialog.Root>
        </div>
      </Page.Content>
    </Page>
  ),
};
export const DefaultOpen = {
  render: ({ ...args }) => (
    <Page>
      <Page.Content className="flex flex-column g-medium-30 align-center justify-center">
        <div className="flex align-center justify-center g-medium-30 flex-wrap">
          <Dialog.Root>
            <Dialog.Trigger>Open Command Menu</Dialog.Trigger>
            <Dialog open>
              <DialogContent />
            </Dialog>
            <Dialog.Overlay closeOnInteract />
          </Dialog.Root>
        </div>
      </Page.Content>
    </Page>
  ),
};
export const NoOverlay = {
  render: ({ ...args }) => (
    <Page>
      <Page.Content className="flex flex-column g-medium-30 align-center justify-center">
        <div className="flex align-center justify-center g-medium-30 flex-wrap">
          <Dialog.Root>
            <Dialog.Trigger>🐻‍❄️</Dialog.Trigger>
            <Dialog open>
              <DialogContent />
            </Dialog>
          </Dialog.Root>
        </div>
      </Page.Content>
    </Page>
  ),
};
