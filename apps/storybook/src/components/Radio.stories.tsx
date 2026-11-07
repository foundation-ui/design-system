import React from "react";
import { Radio, Field, Page } from "@usefui/components";

const meta = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Page className="p-medium-30">
        <Page.Content className="flex align-center justify-center h-100 w-100 g-medium-30">
          <Story />
        </Page.Content>
      </Page>
    ),
  ],
};

export default meta;

export const Default = {
  render: ({ ...args }) => (
    <Radio.Root>
      <Radio variant="primary">
        <Radio.Indicator />
      </Radio>
    </Radio.Root>
  ),
};

export const DefaultChecked = {
  render: ({ ...args }) => (
    <Radio.Root>
      <Radio defaultChecked onChange={() => null}>
        <Radio.Indicator />
      </Radio>
    </Radio.Root>
  ),
};

export const Sizes = {
  render: ({ ...args }) => (
    <div className="flex g-medium-30">
      <div className="flex flex-column g-medium-30">
        {["small", "medium", "large"].map((item: string) => (
          <Radio.Root key={item}>
            <Field.Label
              id={`${item}-label`}
              htmlFor={item}
              className="flex align-center g-medium-30"
              optional
            >
              <Radio
                defaultChecked
                id={item}
                name={item}
                sizing={item as "small"}
              >
                <Radio.Indicator />
              </Radio>

              <div className="flex flex-column">
                <Field.Meta variant="emphasis">{item}</Field.Meta>
                <Field.Meta variant="hint" className="fs-small-60">
                  The {item} Radio variant
                </Field.Meta>
              </div>
            </Field.Label>
          </Radio.Root>
        ))}
      </div>
    </div>
  ),
};

export const Variants = {
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
        <Radio.Root key={item}>
          <Field.Label
            id={`${item}-label`}
            htmlFor={item}
            className="flex align-center g-medium-30"
            optional
          >
            <Radio
              defaultChecked
              id={item}
              name={item}
              variant={item as "primary"}
            >
              <Radio.Indicator />
            </Radio>

            <div className="flex flex-column">
              <Field.Meta variant="emphasis">{item}</Field.Meta>
              <Field.Meta variant="hint" className="fs-small-60">
                The {item} Radio variant
              </Field.Meta>
            </div>
          </Field.Label>
        </Radio.Root>
      ))}
    </div>
  ),
};

export const Group = {
  render: ({ ...args }) => {
    const [value, setValue] = React.useState("a");
    return (
      <Radio.Group name="group" value={value} onValueChange={setValue}>
        <div className="flex flex-column g-medium-30">
          {["Primary", "Secondary", "Tertiary"].map((item: string) => (
            <Field.Label
              key={item}
              id={`${item}-label`}
              htmlFor={item}
              className="flex align-center g-medium-30"
              optional
            >
              <Radio value={item} name={item} id={item} variant="primary">
                <Radio.Indicator />
              </Radio>

              <div className="flex flex-column">
                <Field.Meta variant="emphasis">{item}</Field.Meta>
                <Field.Meta variant="hint" className="fs-small-60">
                  {item} Radio choice
                </Field.Meta>
              </div>
            </Field.Label>
          ))}
        </div>
      </Radio.Group>
    );
  },
};
