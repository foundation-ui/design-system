import React from "react";

import { Page, Resizable } from "@usefui/components";

/**
 * Resizable are used to render children into separated sections that can be resized by users.
 */
const meta = {
  title: "Components/Resizable",
  component: Resizable,
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
};
export default meta;

export const Default = {
  render: () => (
    <div className="w-100 h-100">
      <Resizable
        defaultWidth={30}
        minWidth={0}
        maxWidth={50}
        left={
          <div className="h-100 w-100 flex align-center justify-center bg-mono-darkest">
            One
          </div>
        }
        right={
          <div className="h-100 w-100 flex align-center justify-center">
            Two
          </div>
        }
      />
    </div>
  ),
};
