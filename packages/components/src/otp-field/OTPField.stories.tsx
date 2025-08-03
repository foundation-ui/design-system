import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Field, OTPField, Page } from "..";

const meta = {
  title: "Components/OTPField",
  component: OTPField,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="m-medium-30">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OTPField>;
export default meta;

export const Default = {
  args: {},
  argTypes: {},
  render: () => {
    const [value, setValue] = React.useState("");

    const handleComplete = React.useCallback((value: string) => {
      setValue(value.trim());
    }, []);
    return (
      <Page>
        <Page.Content>
          <form aria-label="story-form">
            <Field.Wrapper className="w-100">
              <Field.Label>Confirmation code</Field.Label>
              <OTPField length={6} onComplete={handleComplete}>
                <OTPField.Group>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <OTPField.Slot key={index} index={index} />
                  ))}
                </OTPField.Group>
              </OTPField>

              {value}
            </Field.Wrapper>
          </form>
        </Page.Content>
      </Page>
    );
  },
};
