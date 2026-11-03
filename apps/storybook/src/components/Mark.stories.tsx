import React from "react";
import { Mark, Tooltip } from "@usefui/components";

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
  title: "Components/Mark",
  component: Mark,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <div className="h-100 w-100 grid justify-center align-center">
        <Story />
      </div>
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
      <Mark fontFamily="monospace">industries</Mark>
      &nbsp;and&nbsp;
      <Mark variant="secondary">settings</Mark>
      &nbsp;to gain insights into user behavior and improve user experience. By
      analyzing user behavior,&nbsp;
      <Mark variant="tertiary">organizations</Mark>
      &nbsp;can identify areas where users may be experiencing difficulties or
      frustration, take steps to improve their product, and then, improve user
      experience.&nbsp;<Mark variant="mono">User analytics</Mark>&nbsp;allows
      you to personalize experiences and better understand&nbsp;
      <Mark variant="border">customer&nbsp;needs.</Mark>
    </p>
  ),
};
export const VariantExtended = {
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
      <Mark variant="success">industries</Mark>
      &nbsp;and&nbsp;
      <Mark variant="danger">settings</Mark>
      &nbsp;to gain insights into user behavior and improve user experience. By
      analyzing user behavior,&nbsp;
      <Mark variant="warning">organizations</Mark>
      &nbsp;can identify areas where users may be experiencing difficulties or
      frustration, take steps to improve their product, and then, improve user
      experience.&nbsp;<Mark variant="hint">User analytics</Mark>&nbsp;allows
      you to personalize experiences and better understand&nbsp;
      <Mark variant="meta">customer&nbsp;needs.</Mark>
    </p>
  ),
};
