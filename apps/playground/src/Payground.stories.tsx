import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Payground",
  component: React.Fragment,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof React.Fragment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const App: Story = {};
