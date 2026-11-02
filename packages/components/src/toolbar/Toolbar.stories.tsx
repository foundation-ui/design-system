import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Button, Divider, Page, Toolbar } from "..";
import {
  ComponentSizeEnum,
  ComponentSideEnum,
  ComponentHeightEnum,
} from "../types";

const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
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
} satisfies Meta<typeof Toolbar>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Shared markup used by most stories. */
const Tools = () => (
  <React.Fragment>
    <Toolbar.Section alwaysVisible>
      <Toolbar.Item
        showFirstChild
        className="flex justify-between align-center p-r-medium-30"
      >
        <Avatar
          sizing="small"
          src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
        >
          <Avatar.Badge src="https://www.untitledui.com/logos/images/Layers.jpg" />
        </Avatar>
        <Toolbar.Trigger aria-label="Toggle toolbar" variant="mono">
          &hArr;
        </Toolbar.Trigger>
      </Toolbar.Item>
    </Toolbar.Section>
    <Toolbar.Content>
      <Toolbar.Section className="p-t-medium-60 p-r-medium-30 flex flex-column g-medium-10 fs-medium-10">
        <Toolbar.Item>Playground</Toolbar.Item>
        <Toolbar.Item>Models</Toolbar.Item>
        <Toolbar.Item>Documentation</Toolbar.Item>
      </Toolbar.Section>
    </Toolbar.Content>
  </React.Fragment>
);

export const Default: Story = {
  args: {
    side: ComponentSideEnum.Left,
    sizing: ComponentSizeEnum.Medium,
    height: ComponentHeightEnum.Fullscreen,
  },
  render: (args) => (
    <Toolbar.Root defaultOpen={false}>
      <Page className="flex w-100 h-100">
        <Page.Wrapper className="flex p-medium-30">
          <Toolbar {...args}>
            <Tools />
          </Toolbar>

          <Page.Content className="h-100 w-100 p-medium-30 flex justify-between">
            <Toolbar.Trigger aria-label="Toggle toolbar" variant="mono">
              &hArr;
            </Toolbar.Trigger>
          </Page.Content>
        </Page.Wrapper>
      </Page>
    </Toolbar.Root>
  ),
};

export const Controlled: Story = {
  args: {
    side: ComponentSideEnum.Left,
    sizing: ComponentSizeEnum.Medium,
    height: ComponentHeightEnum.Fullscreen,
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Toolbar.Root open={open} onOpenChange={setOpen}>
        <Page className="flex w-100 h-100">
          <Page.Wrapper className="flex p-medium-30">
            <Toolbar {...args}>
              <Tools />
            </Toolbar>

            <Page.Content className="h-100 w-100 p-medium-30 flex justify-between">
              <Toolbar.Trigger aria-label="Toggle toolbar" variant="mono">
                &hArr;
              </Toolbar.Trigger>

              <p className="fs-small-60">
                Toolbar is {open ? "open" : "closed"}
              </p>
            </Page.Content>
          </Page.Wrapper>
        </Page>
      </Toolbar.Root>
    );
  },
};
