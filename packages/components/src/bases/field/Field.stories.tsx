import React from "react";
import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";
import { Field, IFieldLabel, FieldVariantEnum } from ".";

const Wrapper = styled.div`
  margin: var(--measurement-medium-30);
`;
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
    variant: FieldVariantEnum.Secondary,
    hint: "Hint message",
    error: "",
  },
  argTypes: {
    variant: {
      options: [
        FieldVariantEnum.Primary,
        FieldVariantEnum.Secondary,
        FieldVariantEnum.Ghost,
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

            <Field placeholder="Placeholder" raw={args.raw} {...args} />
          </Field.Wrapper>
          <Field.Meta raw={args.raw}>External description</Field.Meta>
        </Field.Root>
      </Wrapper>
    );
  },
};
