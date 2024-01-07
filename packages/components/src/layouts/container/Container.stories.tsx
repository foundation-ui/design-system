import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Container } from ".";

const Wrapper = styled.div``;
const meta = {
  title: "Components/Layouts/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Container>;

export default meta;

export const Default = {
  args: {},
  argTypes: {},
  render: ({ ...args }) => <Wrapper></Wrapper>,
};
