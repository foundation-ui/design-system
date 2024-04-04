import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Portal } from "../../";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.
/**
 * Portal are used to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
 */
const meta = {
  title: "Components/Layers/Portal",
  component: Portal,
  tags: ["autodocs"],
} satisfies Meta<typeof Portal>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    container: "",
  },
  render: ({ ...args }) => (
    <React.Fragment>
      <div id="portal-container" />
      <Portal container="portal-container">🐻🐻‍❄️🦊🐱🐶</Portal>
    </React.Fragment>
  ),
};
