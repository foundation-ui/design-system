import React from "react";
import styled from "styled-components";
import type { Meta } from "@storybook/react";
import { Field, FieldModeEnum } from ".";
import { Button, ButtonVariantEnum } from "../button";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;

  div {
    display: grid;
    width: 100%;
    max-width: var(--measurement-large-90);
  }
`;

const meta = {
  title: "Components/Bases/Field",
  component: Field,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Field>;

export default meta;
export const Default = {
  args: {
    raw: false,
    optional: false,
    disabled: false,
    hint: FieldModeEnum.Hint,
    error: "Error message",
  },

  render: ({ ...args }) => {
    return (
      <Wrapper>
        <div>
          <Field.Root>
            <Field.Label
              optional={args.optional}
              variant={FieldModeEnum.Emphasis}
            >
              Default Input
            </Field.Label>

            <Field
              hint={args.hint}
              error={args.error}
              disabled={args.disabled}
            />

            <Field.Meta variant={FieldModeEnum.Error}>
              Static Input meta
            </Field.Meta>
          </Field.Root>
        </div>
      </Wrapper>
    );
  },
};
