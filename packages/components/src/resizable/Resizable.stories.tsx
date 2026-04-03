import React from "react";

import { Page, Resizable } from "..";

/**
 * Resizable are used to render children into separated sections that can be resized by users.
 */
const meta = {
  title: "Components/Resizable",
  component: Resizable,
  tags: ["autodocs"],
};
export default meta;

export const Default = {
  render: () => (
    <Page>
      <Page.Content>
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
      </Page.Content>
    </Page>
  ),
};
