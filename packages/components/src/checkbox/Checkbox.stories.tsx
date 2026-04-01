import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, Field, Page } from "..";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../types";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  argTypes: {
    variant: {
      options: [
        ComponentVariantEnum.Primary,
        ComponentVariantEnum.Mono,
        ComponentVariantEnum.Border,
        ComponentVariantEnum.Ghost,
      ],
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
    <Checkbox.Root>
      <Checkbox variant="primary">
        <Checkbox.Indicator />
      </Checkbox>
    </Checkbox.Root>
  ),
};
export const DefaultChecked: Story = {
  render: ({ ...args }) => (
    <Checkbox.Root>
      <Checkbox defaultChecked onChange={() => null}>
        <Checkbox.Indicator />
      </Checkbox>
    </Checkbox.Root>
  ),
};

export const Sizes: Story = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <div className="flex flex-column g-medium-30">
        {["small", "medium", "large"].map((item: string) => (
          <Checkbox.Root key={item}>
            <Field.Label
              id={`${item}-label`}
              htmlFor={item}
              className="flex align-center g-medium-30"
              optional
            >
              <Checkbox
                defaultChecked
                id={item}
                name={item}
                sizing={item as "small"}
              >
                <Checkbox.Indicator />
              </Checkbox>

              <div className="flex flex-column">
                <Field.Meta variant="emphasis">{item}</Field.Meta>
                <Field.Meta variant="hint" className="fs-small-60">
                  The {item} Checkbox variant
                </Field.Meta>
              </div>
            </Field.Label>
          </Checkbox.Root>
        ))}
      </div>
    </div>
  ),
};
export const Variants: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-column g-medium-30">
      {[
        "accent",
        "primary",
        "secondary",
        "tertiary",
        "hint",
        "meta",
        "success",
        "danger",
        "warning",
      ].map((item: string) => (
        <Checkbox.Root key={item}>
          <Field.Label
            id={`${item}-label`}
            htmlFor={item}
            className="flex align-center g-medium-30"
            optional
          >
            <Checkbox
              defaultChecked
              id={item}
              name={item}
              variant={item as "primary"}
            >
              <Checkbox.Indicator />
            </Checkbox>

            <div className="flex flex-column">
              <Field.Meta variant="emphasis">{item}</Field.Meta>
              <Field.Meta variant="hint" className="fs-small-60">
                The {item} Checkbox variant
              </Field.Meta>
            </div>
          </Field.Label>
        </Checkbox.Root>
      ))}
    </div>
  ),
};
