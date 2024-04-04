import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Page, Container } from "../../";
import {
  ComponentSizeEnum,
  ComponentSideEnum,
  ComponentHeightEnum,
} from "../../../../../types";

const meta = {
  title: "Components/Layouts/Page",
  component: Page,
  tags: ["autodocs"],
} satisfies Meta<typeof Page>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Composed: Story = {
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
      <Page>
        <Page.Tools
          shortcut
          hotkey=";"
          showoncollapse
          side={ComponentSideEnum.Left}
          sizing={ComponentSizeEnum.Medium}
        />
        <Container.Col style={{ height: "100dvh" }}>
          <Page.Navigation>🐻</Page.Navigation>
          <Page.Menu>🐻‍❄️</Page.Menu>
          <Page.Content>🦊</Page.Content>
          <Page.Panel
            shortcut
            hotkey=","
            side={ComponentSideEnum.Bottom}
            sizing={ComponentSizeEnum.Large}
          >
            🐱
          </Page.Panel>
        </Container.Col>
        <Page.Tools
          shortcut
          hotkey=":"
          defaultOpen
          side={ComponentSideEnum.Right}
          sizing={ComponentSizeEnum.Large}
        />
      </Page>
    );
  },
};
