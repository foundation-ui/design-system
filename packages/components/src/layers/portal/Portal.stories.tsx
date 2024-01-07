import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Portal } from ".";

const Wrapper = styled.div``;
const meta = {
  title: "Components/Layers/Portal",
  component: Portal,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Portal>;

export default meta;

export const Default = {
  args: {},
  argTypes: {},
  render: ({ ...args }) => <Wrapper></Wrapper>,
};
