import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Overlay } from ".";

const Wrapper = styled.div``;
const meta = {
  title: "Components/Layers/Overlay",
  component: Overlay,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Overlay>;

export default meta;

export const Default = {
  args: {},
  argTypes: {},
  render: ({ ...args }) => <Wrapper></Wrapper>,
};
