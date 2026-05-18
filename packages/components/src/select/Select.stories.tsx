import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, Page, Field, ScrollArea } from "..";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Page>
        <Page.Content className="p-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = React.useState<string | undefined>(undefined);
    const [valueLabel, setValueLabel] = React.useState<string | undefined>(
      undefined,
    );
    const [valueHandle, setValueHandle] = React.useState<string | undefined>(
      undefined,
    );

    const TEAM_MEMBERS = [
      { value: "phoenix", label: "Phoenix Baker", handle: "@phoenix" },
      { value: "olivia", label: "Olivia Rhye", handle: "@olivia" },
      { value: "lana", label: "Lana Steiner", handle: "@lana" },
      { value: "demi", label: "Demi Wilkinson", handle: "@demi" },
      { value: "candice", label: "Candice Wu", handle: "@candice" },
      { value: "natali", label: "Natali Craig", handle: "@natali" },
    ];

    return (
      <div className="flex flex-column align-center justify-center flex-wrap h-100 w-100 g-medium-30">
        <Field.Wrapper style={{ width: 325 }}>
          <Field.Label>Team member</Field.Label>
          <Select.Root>
            <Select>
              <Select.Trigger>
                {value && valueHandle ? (
                  <React.Fragment>
                    {valueLabel}&nbsp;
                    <span className="opacity-default-60">{valueHandle}</span>
                  </React.Fragment>
                ) : (
                  "Select an Item"
                )}
              </Select.Trigger>
              <Select.Content className="grid g-small-30">
                {TEAM_MEMBERS.map((member) => (
                  <Select.Item
                    key={member.value}
                    value={member.value}
                    className="fs-medium-20"
                    onClick={() => {
                      setValue(member.value);
                      setValueHandle(member.handle);
                      setValueLabel(member.label);
                    }}
                  >
                    {member.label}&nbsp;
                    <span className="opacity-default-60">{member.handle}</span>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </Select.Root>

          <Field.Meta variant="hint">
            This is a hint text to help user.
          </Field.Meta>
        </Field.Wrapper>
      </div>
    );
  },
};
