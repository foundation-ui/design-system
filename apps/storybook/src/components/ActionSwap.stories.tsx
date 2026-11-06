import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Page, ActionSwap, Tooltip } from "@usefui/components";
import { Icon } from "@usefui/icons";

/**
 * CopyButton are used to copy stored values when clicked.
 */
const meta = {
  title: "Components/ActionSwap",
  component: ActionSwap,
  tags: ["autodocs"],
} satisfies Meta<typeof ActionSwap>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: ({ ...args }) => (
    <Page className="p-medium-30">
      <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
        <ActionSwap
          variant="secondary"
          sizing="small"
          shape="round"
          animation="reflective"
          delay={1000}
          onClick={() => console.log("ActionSwap: onClick function")}
          actions={[
            <Icon className="m-y-small-80">
              <Icon.Heart />
            </Icon>,
            <Icon className="m-y-small-80">
              <Icon.Check />
            </Icon>,
          ]}
        />
      </Page.Content>
    </Page>
  ),
};
export const CopyToClipboard: Story = {
  args: {
    value: "Hello, world!",
  },
  render: ({ ...args }) => (
    <Page className="p-medium-30">
      <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
        <Tooltip content="Copy">
          <ActionSwap.Copy
            variant="meta"
            sizing="small"
            shape="round"
            animation="lift"
            sound="tick"
            value="ActionSwap.Copy: Copied value"
            actions={[
              <Icon className="m-y-small-80">
                <Icon.Copy />
              </Icon>,
              <Icon className="m-y-small-80">
                <Icon.Check />
              </Icon>,
            ]}
          />
        </Tooltip>
      </Page.Content>
    </Page>
  ),
};
