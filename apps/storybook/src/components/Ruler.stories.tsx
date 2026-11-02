import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, Ruler } from "@usefui/components";

/**
 * RulerCanvas renders a canvas area with horizontal and vertical rulers,
 * allowing users to create and drag guides for precise alignment.
 */
const meta = {
  title: "Components/Ruler",
  component: Ruler,
  tags: ["autodocs"],
} satisfies Meta<typeof Ruler>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: ({ ...args }) => (
    <Page>
      <Ruler.Root>
        <Ruler>
          <Ruler.Corner />
          <Ruler.Row orientation="horizontal" />
          <Ruler.Row orientation="vertical" />
          <Ruler.Canvas>
            <Ruler.Lines />
            <div className="h-100 w-100 flex align-center justify-center">
              <p className="fs-medium-20">Page Content</p>
            </div>
          </Ruler.Canvas>
        </Ruler>
      </Ruler.Root>
    </Page>
  ),
};
