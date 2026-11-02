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
  Viewport,
} from "..";

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
        className="flex flex-column justify-between h-100"
      >
        <nav className="w-100 justify-between flex align-center g-medium-30">
          <p className="fs-medium-10">Morphing Box Content</p>

          <MorphingBox.Control
            variant="mono"
            sizing="small"
            shape="round"
            sound="slide"
          >
            <span className=" m-y-medium-10 m-x-small-60">✕</span>
          </MorphingBox.Control>
        </nav>
        <div className="w-100 h-100 flex align-start justify-start">
          <p className="fs-medium-10 p-y-medium-60 opacity-default-30">
            <ResponseStream
              autoScroll
              charactersPerSecond={512}
              content=" A streaming response arrives progressively, one character at a time, while the rest of the answer is still being generated. Once every character has been received, the response is marked as complete. A response has two distinct phases: content is still arriving, then the answer becomes available for action. The layout should remain stable across that boundary while rich content continues to render normally."
            />
          </p>
        </div>
        <nav className="w-100 justify-between flex align-center g-medium-30 p-medium-30">
          <div className="flex align-center g-medium-30">
            <Loader.Dither sizing="small" />
            <Shimmer className="fs-medium-20">chambellan code:validate</Shimmer>
          </div>

          <Pill sizing="small" shape="smooth" status="success" />
        </nav>
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
