import React from "react";
import { Breadcrumb, Page } from "@usefui/components";

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
    <Page className="flex flex-column">
      <Page.Navigation className="flex align-center justify-center">
        <Breadcrumb path={"/test/demo-path/current-path"} navigate={navigate}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
      </Page.Navigation>
      <Page.Wrapper
        $navigations={1}
        className="flex p-x-medium-30 p-b-medium-30"
      >
        <Page.Content className="w-100 h-100 p-medium-30"></Page.Content>
      </Page.Wrapper>
    </Page>
  ),
};
