import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Dialog, Button, Container, Portal } from "../../";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const Wrapper = styled.div``;
const meta = {
  title: "Components/Layers/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;
export default meta;

type Story = StoryObj<typeof meta>;
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
    <Dialog.Root>
      <Dialog.Trigger>🐻‍❄️</Dialog.Trigger>
      <Dialog>
        🐻🐻‍❄️🦊🐱🐶
        <Dialog.Menu>
          <Dialog.Control>🐻</Dialog.Control>
        </Dialog.Menu>
      </Dialog>
      <Dialog.Overlay />
    </Dialog.Root>
  ),
};
export const DefaultOpen = {
  render: ({ ...args }) => (
    <Dialog.Root>
      <Dialog.Trigger>🐻‍❄️</Dialog.Trigger>

      <Dialog open>
        🐻🐻‍❄️🦊🐱🐶
        <Dialog.Menu>
          <Dialog.Control>🐻</Dialog.Control>
        </Dialog.Menu>
      </Dialog>
      <Dialog.Overlay />
    </Dialog.Root>
  ),
};
