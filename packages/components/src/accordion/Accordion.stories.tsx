import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Accordion, Page } from "..";
import { ComponentSizeEnum, ComponentVariantEnum } from "../../../../types";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Accordion>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default = {
  args: {},
  argTypes: {},
  render: ({ ...args }) => (
    <Accordion.Root>
      <Accordion className="flex flex-column align-center justify-center w-100 g-medium-30">
        <Accordion.Trigger value="demo">
          chambellan registry:read Components Accordion&nbsp;↓
        </Accordion.Trigger>

        <Accordion.Content value="demo">
          <p className="fs-medium-20">
            Accordions are used to expand and collapse sections of content.
          </p>
        </Accordion.Content>
      </Accordion>
    </Accordion.Root>
  ),
};
export const DefaultOpen: Story = {
  render: ({ ...args }) => (
    <Accordion.Root>
      <Accordion className="flex flex-column align-center justify-center w-100 g-medium-30">
        <Accordion.Trigger value="demo">
          chambellan registry:read Components Accordion&nbsp;↓
        </Accordion.Trigger>

        <Accordion.Content value="demo" defaultOpen>
          <p className="fs-medium-20">
            Accordions are used to expand and collapse sections of content.
          </p>
        </Accordion.Content>
      </Accordion>
    </Accordion.Root>
  ),
};
export const Group: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-column g-medium-60">
      {["Accordion", "Button"].map((item) => (
        <Accordion.Root key={item}>
          <Accordion className="flex flex-column w-100 g-medium-30">
            <Accordion.Trigger value="demo">
              chambellan registry:read Components&nbsp;{item}&nbsp;↓
            </Accordion.Trigger>

            <Accordion.Content value="demo" defaultOpen>
              <p className="fs-medium-20">
                {item}&nbsp;are exported by @usefui/components.
              </p>
            </Accordion.Content>
          </Accordion>
        </Accordion.Root>
      ))}
    </div>
  ),
};
