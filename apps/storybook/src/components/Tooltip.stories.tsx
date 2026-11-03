import React from "react";
import { Button, Page, Tooltip } from "@usefui/components";
import { Icon } from "@usefui/icons";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Toolpire are used to convey additional information while hovering a component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is short and readable.
 *
 */
const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
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
  args: {
    raw: false,
    content: "",
    delay: 200,
    children: "",
  },
  argTypes: {},
  render: () => (
    <p className="fs-medium-20 p-large-30">
      User analytics is applied in various&nbsp;
      <Tooltip content="Tooltip" hint="Ctrl+B" sizing="small">
        <b>industries</b>
      </Tooltip>
      &nbsp;and settings to gain insights into user behavior and improve user
      experience. By analyzing user behavior,&nbsp;
      <Tooltip
        content="Tooltip with shortcut"
        variant="secondary"
        hint="Ctrl+B"
      >
        <b>organizations</b>
      </Tooltip>
      &nbsp;can identify areas where users may be experiencing difficulties or
      frustration, take steps to improve their product, and then, improve user
      experience. User analytics allows you to personalize experiences and
      better understand&nbsp;
      <Tooltip
        content="User analytics is applied in various industries and settings to gain insights into user behavior and improve user experience."
        sizing="large"
        variant="secondary"
      >
        <b>customer</b>
      </Tooltip>
      &nbsp;needs.
    </p>
  ),
};
export const Positions = {
  render: ({ ...args }) => (
    <div className="w-100 h-100 flex flex-column justify-between">
      {Array.from({ length: 3 }).map(() => (
        <div className="flex align-center justify-between w-100">
          {Array.from({ length: 3 }).map(() => (
            <Tooltip variant="secondary" content="Tooltip">
              <Button variant="ghost">
                <Icon className="m-y-small-80">
                  <Icon.InfoSquare />
                </Icon>
              </Button>
            </Tooltip>
          ))}
        </div>
      ))}
    </div>
  ),
};
