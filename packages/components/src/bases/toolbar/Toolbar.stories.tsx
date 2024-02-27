import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Toolbar } from ".";
import { Avatar, Container } from "../../";
import { ComponentSizeEnum, ComponentSideEnum } from "../../../../../types";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const meta = {
  title: "Components/Bases/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    raw: false,
    side: ComponentSideEnum.Left,
    sizing: ComponentSizeEnum.Large,
    defaultOpen: true,
    fixed: false,
    showoncollapse: true,
    showFirstChild: true,
    shortcut: true,
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
  },
  render: ({ ...args }) => (
    <Wrapper>
      <Toolbar.Root>
        <Toolbar
          raw={args.raw}
          side={args.side}
          sizing={args.sizing}
          defaultOpen={args.defaultOpen}
          shortcut={args.shortcut}
          hotkey={args.hotkey}
          fixed={args.fixed}
          // bindkey={bindkey}
        >
          <Toolbar.Section showoncollapse={args.showoncollapse}>
            <Container.Row
              style={{ justifyContent: "start", gap: 6, alignItems: "end" }}
            >
              <Avatar
                src="https://avatars.githubusercontent.com/u/153380498?s=160&v=4"
                alt="external-source-avatar"
                sizing={ComponentSizeEnum.Large}
              />
              <Toolbar.Item>
                <Container.Col>
                  <b>Foundation UI</b>
                  <small style={{ opacity: 0.3 }}>Toolbar component</small>
                </Container.Col>
              </Toolbar.Item>
            </Container.Row>
          </Toolbar.Section>

          {!args.fixed && (
            <Toolbar.Trigger onClick={() => console.log("click")}>
              &hArr;
            </Toolbar.Trigger>
          )}
        </Toolbar>
      </Toolbar.Root>
    </Wrapper>
  ),
};
