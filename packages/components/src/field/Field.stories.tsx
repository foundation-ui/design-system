import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Field, Page } from "..";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../types";

const meta = {
  title: "Components/Field",
  component: Field,
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
      <Page>
        <Page.Content>
          <div className="flex flex-column align-center justify-center h-100 g-medium-30">
            {["large", "medium", "small"].map((item) => (
              <Field.Root key={item}>
                <Field.Wrapper style={{ width: 325 }}>
                  <Field sizing={item} placeholder={item} variant="secondary" />
                </Field.Wrapper>
              </Field.Root>
            ))}
          </div>
        </Page.Content>
      </Page>
    );
  },
};
export const Shapes = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content>
          <div className="flex flex-column align-center justify-center h-100 g-medium-30">
            {["square", "smooth", "round"].map((item) => (
              <Field.Root key={item}>
                <Field.Wrapper style={{ width: 325 }}>
                  <Field
                    shape={item}
                    sizing="medium"
                    placeholder={item}
                    variant="secondary"
                  />
                </Field.Wrapper>
              </Field.Root>
            ))}
          </div>
        </Page.Content>
      </Page>
    );
  },
};
export const Variants = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content>
          <div className="flex flex-column align-center justify-center h-100 g-medium-30">
            {["primary", "secondary", "ghost"].map((item) => (
              <Field.Root key={item}>
                <Field.Wrapper style={{ width: 325 }}>
                  <Field
                    shape="smooth"
                    sizing="medium"
                    placeholder={item}
                    variant={item}
                  />
                </Field.Wrapper>
              </Field.Root>
            ))}
          </div>
        </Page.Content>
      </Page>
    );
  },
};
export const Text = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content>
          <div className="flex flex-column align-center justify-center flex-wrap h-100 w-100 g-medium-30">
            <Field.Root>
              <Field.Wrapper style={{ width: 325 }}>
                <Field.Label>Text</Field.Label>
                <Field variant="secondary" placeholder="Placeholder..." />
                <Field.Meta variant="hint">
                  This is a hint text to help user.
                </Field.Meta>
              </Field.Wrapper>
            </Field.Root>
          </div>
        </Page.Content>
      </Page>
    );
  },
};
export const Number = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content>
          <div className="flex flex-column align-center justify-center flex-wrap h-100 w-100 g-medium-30">
            <Field.Root>
              <Field.Wrapper style={{ width: 325 }}>
                <Field.Label>Number</Field.Label>
                <Field.Number placeholder="100" min={0} max={100} />
                <Field.Meta variant="hint">
                  This is a hint text to help user.
                </Field.Meta>
              </Field.Wrapper>
            </Field.Root>
          </div>
        </Page.Content>
      </Page>
    );
  },
};

export const Date = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content>
          <div className="flex flex-column align-center justify-center flex-wrap h-100 w-100 g-medium-30">
            <Field.Root>
              <Field.Wrapper style={{ width: 325 }}>
                <Field.Label>Date</Field.Label>
                <Field.Date
                  variant="secondary"
                  // defaultValue={new Date()}
                  locale="en-US"
                  withTime
                />
                <Field.Meta variant="hint">
                  This is a hint text to help user.
                </Field.Meta>
              </Field.Wrapper>
            </Field.Root>
          </div>
        </Page.Content>
      </Page>
    );
  },
};
export const File = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content>
          <div className="flex flex-column align-center justify-center flex-wrap h-100 w-100 g-medium-30">
            <Field.Root>
              <Field.Wrapper style={{ width: 325 }}>
                <Field.Label>Upload file</Field.Label>
                <Field.File
                  variant="secondary"
                  sizing="medium"
                  trigger={
                    <span className="fs-small-50 flex align-center justify-center w-100 h-100">
                      Upload
                    </span>
                  }
                  onFileChange={(files) => console.log(files)}
                  multiple
                />
                <Field.Meta variant="hint">
                  SVG, PNG, JPG or GIF (max. 800x400px).
                </Field.Meta>
              </Field.Wrapper>
            </Field.Root>
          </div>
        </Page.Content>
      </Page>
    );
  },
};
export const Password = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content>
          <div className="flex flex-column align-center justify-center flex-wrap h-100 w-100 g-medium-30">
            <Field.Root>
              <Field.Wrapper style={{ width: 325 }}>
                <Field.Label>Password</Field.Label>
                <Field.Password variant="secondary" sizing="medium" />
                <Field.Meta variant="hint">
                  Must be at least 8 characters.
                </Field.Meta>
              </Field.Wrapper>
            </Field.Root>
          </div>
        </Page.Content>
      </Page>
    );
  },
};
export const Tag = {
  render: ({ ...args }) => {
    return (
      <Page>
        <Page.Content>
          <div className="flex flex-column align-center justify-center flex-wrap h-100 w-100 g-medium-30">
            <Field.Root>
              <Field.Wrapper style={{ width: 325 }}>
                <Field.Label>Tags</Field.Label>
                <Field.Tag
                  defaultValue={["Design", "Engineering"]}
                  onChange={(tags) => console.log(tags)}
                  placeholder="Type and press Enter…"
                  allowed={["Design", "Engineering", "UI", "UX", "AI"]}
                />
                <Field.Meta variant="hint">
                  This is a hint text to help user.
                </Field.Meta>
              </Field.Wrapper>
            </Field.Root>
          </div>
        </Page.Content>
      </Page>
    );
  },
};
