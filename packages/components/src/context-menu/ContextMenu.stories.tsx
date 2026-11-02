import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ContextMenu, Divider, Page, Skeleton } from "..";

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
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
} satisfies Meta<typeof ContextMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: ({ ...args }) => {
    return (
      <ContextMenu.Root>
        <ContextMenu onOpenChange={(open) => console.log(open)}>
          <ContextMenu.Area className="w-100 h-100 flex align-center justify-center">
            <p className="fs-small-50 opacity-default-10">
              Right click anywhere to open the Contextual Menu.
            </p>
          </ContextMenu.Area>

          <ContextMenu.Content
            aria-label="Actions"
            className="flex flex-column"
            sizing="small"
          >
            <ContextMenu.Item className="fs-medium-10">Open</ContextMenu.Item>
            <ContextMenu.Item className="fs-medium-10">Rename</ContextMenu.Item>
            <ContextMenu.Item className="fs-medium-10">
              Duplicate
            </ContextMenu.Item>
            <ContextMenu.Item className="fs-medium-10">Radio</ContextMenu.Item>
            <ContextMenu.Item radio className="fs-medium-10 color-red">
              Move to trash
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu>
      </ContextMenu.Root>
    );
  },
};
