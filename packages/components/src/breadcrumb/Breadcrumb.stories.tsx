import React from "react";
import { Page, Breadcrumb } from "..";

import type { Meta, StoryObj } from "@storybook/react";

/**
 *
 */
const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;
export default meta;

type Story = StoryObj<typeof meta>;

const navigate = (href: string) => {
  console.log(href);
};
export const Default: Story = {
  args: {
    path: "",
  },
  render: ({ ...args }) => (
    <Page>
      <Page.Content>
        <div className="flex align-center justify-center h-100">
          <Breadcrumb path={"/test/demo-path/current-path"} navigate={navigate}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Page.Content>
    </Page>
  ),
};
