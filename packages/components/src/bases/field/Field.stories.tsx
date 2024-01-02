import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import { Field, IFieldLabel } from ".";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../../types";

const Wrapper = styled.div``;
const meta = {
  title: "Components/Bases/Field",
  component: Field,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;
type LabelStory = StoryObj<IFieldLabel>;

export const Default: Story | LabelStory = {
  args: {
    raw: false,
    optional: false,
    disabled: false,
    variant: ComponentVariantEnum.Secondary,
    sizing: ComponentSizeEnum.Medium,
    hint: "Hint message",
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
      <Wrapper>
        <Field.Root>
          <Field.Wrapper>
            <Field.Label raw={args.raw} optional={args.optional}>
              Default Input
            </Field.Label>

            <Field
              placeholder="Placeholder"
              raw={args.raw}
              variant={args.variant}
              sizing={args.sizing}
              {...args}
            />
          </Field.Wrapper>
          <Field.Meta raw={args.raw}>External description</Field.Meta>
        </Field.Root>
      </Wrapper>
    );
  },
};
