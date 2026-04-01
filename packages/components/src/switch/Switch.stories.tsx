import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Field, Page, Switch } from "..";
import { ComponentSizeEnum, ComponentVariantEnum } from "../../../../types";

// Duplicated doc: The JSDoc content isn't rendering on Storybook.

/**
 * Switch are toggle components that allows the user to turn a setting on or off.
 *
 * **Best practices:**
 *
 * - Use a clear and descriptive label for each switch.
 * - The interaction must have predictable behavior.
 */
const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Page>
        <Page.Content className="p-medium-30">
          <div className="flex flex-column align-center justify-center h-100 g-medium-30">
            <Story />
          </div>
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Switch>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    raw: false,
    defaultChecked: false,
  },
  argTypes: {
    variant: {
      options: [ComponentVariantEnum.Primary, ComponentVariantEnum.Ghost],
      control: { type: "radio" },
    },
    sizing: {
      options: [
        ComponentSizeEnum.Small,
        ComponentSizeEnum.Medium,
        ComponentSizeEnum.Large,
      ],
      control: { type: "radio" },
    },
  },
  render: ({ ...args }) => (
    <Switch.Root>
      <Switch>
        <Switch.Thumb />
      </Switch>
    </Switch.Root>
  ),
};
export const DefaultChecked: Story = {
  render: ({ ...args }) => (
    <Switch.Root>
      <Switch defaultChecked>
        <Switch.Thumb />
      </Switch>
    </Switch.Root>
  ),
};
export const Sizes: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-column g-medium-30">
      {["small", "medium", "large"].map((item) => (
        <Switch.Root key={item}>
          <Field.Label
            id={`${item}-label`}
            htmlFor={item}
            className="flex align-center g-medium-30"
            optional
          >
            <Switch name={item} sizing={item}>
              <Switch.Thumb />
            </Switch>

            <div className="flex flex-column">
              <Field.Meta variant="emphasis">{item}</Field.Meta>
              <Field.Meta variant="hint" className="fs-small-60">
                The {item} Checkbox sizing
              </Field.Meta>
            </div>
          </Field.Label>
        </Switch.Root>
      ))}
    </div>
  ),
};
export const Variants: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-column g-medium-30">
      {["accent", "primary"].map((item) => (
        <Switch.Root key={item}>
          <Field.Label
            id={`${item}-label`}
            htmlFor={item}
            className="flex align-center g-medium-30"
            optional
          >
            <Switch name={item} variant={item}>
              <Switch.Thumb />
            </Switch>

            <div className="flex flex-column">
              <Field.Meta variant="emphasis">{item}</Field.Meta>
              <Field.Meta variant="hint" className="fs-small-60">
                The {item} Checkbox variant
              </Field.Meta>
            </div>
          </Field.Label>
        </Switch.Root>
      ))}
    </div>
  ),
};
