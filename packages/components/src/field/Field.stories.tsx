import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "..";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../types";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "var(--measurement-medium-30)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    raw: false,
    optional: false,
    hint: "",
    error: "",
  },
  argTypes: {
    variant: {
      options: [
        ComponentVariantEnum.Primary,
        ComponentVariantEnum.Secondary,
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
  render: ({ ...args }) => {
    return (
      <Field.Root>
        <Field />
      </Field.Root>
    );
  },
};
export const Label = {
  render: ({ ...args }) => {
    return (
      <Field.Root>
        <Field.Wrapper>
          <Field.Label>Label</Field.Label>
          <Field />
        </Field.Wrapper>
      </Field.Root>
    );
  },
};
export const Description = {
  render: ({ ...args }) => {
    return (
      <Field.Root>
        <Field />
        <Field.Meta>Meta</Field.Meta>
      </Field.Root>
    );
  },
};
export const Hint = {
  render: ({ ...args }) => {
    return (
      <Field.Root>
        <Field hint="hint" />
      </Field.Root>
    );
  },
};
export const Error = {
  render: ({ ...args }) => {
    return (
      <Field.Root>
        <Field error="error" />
      </Field.Root>
    );
  },
};
export const Composed = {
  render: ({ ...args }) => {
    return (
      <Field.Root>
        <Field.Wrapper>
          <Field.Label>Label</Field.Label>
          <Field hint="hint" />
        </Field.Wrapper>
        <Field.Meta>Meta</Field.Meta>
      </Field.Root>
    );
  },
};
export const ComposedError = {
  render: ({ ...args }) => {
    return (
      <Field.Root>
        <Field.Wrapper>
          <Field.Label>Label</Field.Label>
          <Field error="error" hint="hint" />
        </Field.Wrapper>
        <Field.Meta>Meta</Field.Meta>
      </Field.Root>
    );
  },
};
export const Sizes = {
  render: ({ ...args }) => {
    return (
      <div className="flex g-medium-30">
        {["large", "medium", "small"].map((item) => (
          <Field.Root key={item}>
            <Field placeholder={item} sizing={item} />
          </Field.Root>
        ))}
      </div>
    );
  },
};
export const Variants = {
  render: ({ ...args }) => {
    return (
      <div className="flex g-medium-30">
        {["primary", "secondary", "ghost"].map((item) => (
          <Field.Root key={item}>
            <Field placeholder={item} variant={item} />
          </Field.Root>
        ))}
      </div>
    );
  },
};
