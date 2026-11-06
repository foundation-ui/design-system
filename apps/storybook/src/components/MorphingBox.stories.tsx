import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  Loader,
  MorphingBox,
  Page,
  Pill,
  ResponseStream,
  Shimmer,
  Skeleton,
  Video,
  Viewport,
} from "@usefui/components";

const meta = {
  title: "Components/MorphingBox",
  component: MorphingBox,
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
} satisfies Meta<typeof MorphingBox>;
export default meta;

type Story = StoryObj<typeof meta>;

const MorphBoxContent = ({
  direction,
  position,
}: {
  direction: any;
  position: any;
}) => {
  return (
    <MorphingBox.Root>
      <MorphingBox.Trigger
        position={position ?? "bottom-right"}
        sizing="small"
        variant="ghost"
        shape="round"
        sound="toggle"
      >
        <Avatar
          sizing="medium"
          src="https://avatars.githubusercontent.com/u/242926543?s=200&v=4"
        />
      </MorphingBox.Trigger>

      <section className="flex flex-column g-medium-10 align-center justify-center">
        <p className="fs-small-50 opacity-default-10">
          Click on the Avatar or press "Shift+K" to open the MorphingBox.
        </p>
      </section>

      <MorphingBox
        shortcut
        hotkey="K"
        bindkey="shiftKey"
        direction={direction ?? "bottom-right-top-center"}
        sizing="medium"
        className="flex flex-column justify-between g-medium-60"
      >
        <header className="flex flex-column h-100">
          <nav className="w-100 justify-between flex align-center p-x-medium-30 g-medium-30">
            <p className="fs-medium-20">Aspernatur modi</p>

            <MorphingBox.Control
              variant="mono"
              sizing="small"
              shape="round"
              sound="slide"
            >
              <span className=" m-y-medium-10 m-x-small-60">✕</span>
            </MorphingBox.Control>
          </nav>

          <Video
            src="https://d4db9723-ea43-4301-bf21-b7c323a1885d.mdnplay.dev/shared-assets/videos/flower.mp4"
            label="Video priority"
            priority
            autoPlay
            loop
            shape="round"
          />
        </header>

        <footer className="w-100 justify-between flex align-center g-medium-30 p-x-medium-30">
          <Shimmer className="fs-medium-20">Lorem Ipsum</Shimmer>
          <Pill sizing="small" shape="smooth" status="success" />
        </footer>
      </MorphingBox>
      <MorphingBox.Overlay closeOnInteract />
    </MorphingBox.Root>
  );
};

export const Top: Story = {
  render: ({ ...args }) => (
    <MorphBoxContent position="top" direction="top-bottom" />
  ),
};
export const TopRight: Story = {
  render: ({ ...args }) => (
    <MorphBoxContent position="top-right" direction="top-right-bottom-center" />
  ),
};
export const Right: Story = {
  render: ({ ...args }) => (
    <MorphBoxContent position="right" direction="right-left" />
  ),
};
export const BottomRight: Story = {
  render: ({ ...args }) => (
    <MorphBoxContent
      position="bottom-right"
      direction="bottom-right-top-center"
    />
  ),
};
export const Bottom: Story = {
  render: ({ ...args }) => (
    <MorphBoxContent position="bottom" direction="bottom-top" />
  ),
};
export const BottomLeft: Story = {
  render: ({ ...args }) => (
    <MorphBoxContent
      position="bottom-left"
      direction="bottom-left-top-center"
    />
  ),
};
export const Left: Story = {
  render: ({ ...args }) => (
    <MorphBoxContent position="left" direction="left-right" />
  ),
};
export const TopLeft: Story = {
  render: ({ ...args }) => (
    <MorphBoxContent position="top-left" direction="top-left-bottom-center" />
  ),
};
export const OppositeDirections: Story = {
  render: ({ ...args }) => (
    <MorphBoxContent position="top-left" direction="bottom-right-top-center" />
  ),
};
