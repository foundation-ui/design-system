import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "@usefui/components";
import {
  ComponentSizeEnum,
  ComponentSideEnum,
  ComponentHeightEnum,
} from "@usefui/components";

const meta = {
  title: "Components/Page",
  component: Page,
  tags: ["autodocs"],
} satisfies Meta<typeof Page>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    raw: false,
    defaultOpen: false,
    showoncollapse: false,
    showfirstchild: false,
    shortcut: false,
    hotkey: ":",
    bindkey: null,
  },
  argTypes: {
    side: {
      options: [
        ComponentSideEnum.Top,
        ComponentSideEnum.Right,
        ComponentSideEnum.Bottom,
        ComponentSideEnum.Left,
      ],
      control: { type: "radio" },
    },
    sizing: {
      options: [
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ],
      control: { type: "radio" },
    },
    height: {
      options: [ComponentHeightEnum.Fullscreen, ComponentHeightEnum.Auto],
      control: { type: "radio" },
    },
  },
  render: ({ ...args }) => {
    return (
      <Page className="flex flex-column">
        <Page.Navigation />
        <Page.Wrapper
          $navigations={1}
          $menus={1}
          className="w-100 h-100 flex p-medium-30"
        >
          <Page.Content></Page.Content>
        </Page.Wrapper>

        <Page.Menu />
      </Page>
    );
  },
};
