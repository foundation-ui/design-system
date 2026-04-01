import React from "react";
import { Field, OTPField, Page } from "..";

const meta = {
  title: "Components/OTPField",
  component: OTPField,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page>
        <Page.Content className="p-medium-30">
          <div className="flex flex-column align-center justify-center h-100">
            <Story />
          </div>
        </Page.Content>
      </Page>
    ),
  ],
};
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
      <form aria-label="story-form" style={{ width: 325 }}>
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
    );
  },
};
