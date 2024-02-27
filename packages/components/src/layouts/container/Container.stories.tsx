import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Container } from ".";
import { ComponentSizeEnum } from "../../../../../types";

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
  args: {
    proximity: true,
    global: false,
    spacing: ComponentSizeEnum.Medium,
  },
  argTypes: {
    spacing: {
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
      <Container
        proximity={args.proximity}
        global={args.global}
        spacing={args.spacing}
      >
        <div>Contained</div>
        <div>Contained</div>
        <div>Contained</div>
      </Container>
    </Wrapper>
  ),
};
