import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "..";
import { ComponentVariantEnum, ComponentSizeEnum } from "../../../../types";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Field>;
export default meta;

type Story = StoryObj<typeof meta>;

const VARIANTS = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "meta",
  "warning",
  "danger",
  "success",
] as const;

const SIZES = ["large", "medium", "small"] as const;
const SHAPES = ["square", "smooth", "round"] as const;

const Column = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-column align-center justify-center flex-wrap h-100 w-100 g-medium-30">
    {children}
  </div>
);

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Field.Wrapper
    className="flex flex-column g-medium-30"
    style={{ width: 325 }}
  >
    {children}
  </Field.Wrapper>
);

export const Default: Story = {
  args: {
    raw: false,
    hint: "",
    error: "",
  },
  argTypes: {
    variant: {
      options: [...VARIANTS],
      control: { type: "select" },
    },
    sizing: {
      options: [...SIZES],
      control: { type: "radio" },
    },
    shape: {
      options: [...SHAPES],
      control: { type: "radio" },
    },
  },
  render: (args) => (
    <Field.Root>
      <Field {...args} placeholder="Placeholder..." />
    </Field.Root>
  ),
};

export const Label: Story = {
  render: () => (
    <Field.Root>
      <Field.Wrapper>
        <Field.Label>Label</Field.Label>
        <Field />
      </Field.Wrapper>
    </Field.Root>
  ),
};

export const LabelOptional: Story = {
  render: () => (
    <Field.Root>
      <Field.Wrapper>
        <Field.Label optional>Optional label</Field.Label>
        <Field />
      </Field.Wrapper>
    </Field.Root>
  ),
};

export const MetaLabel: Story = {
  render: () => (
    <Field.Root>
      <Field />
      <Field.Meta>Meta</Field.Meta>
    </Field.Root>
  ),
};

export const MetaVariants: Story = {
  render: () => (
    <Column>
      {(["default", "hint", "emphasis", "error"] as const).map((variant) => (
        <Field.Root key={variant}>
          <Frame>
            <Field.Meta variant={variant}>Meta variant: {variant}</Field.Meta>
          </Frame>
        </Field.Root>
      ))}
    </Column>
  ),
};

export const HintLabel: Story = {
  render: () => (
    <Field.Root>
      <Field hint="This is a hint" />
    </Field.Root>
  ),
};

export const Error: Story = {
  render: () => (
    <Field.Root>
      <Field error="This is an error" />
    </Field.Root>
  ),
};

export const ErrorAndHint: Story = {
  render: () => (
    <Field.Root>
      <Field error="error wins over hint" hint="hint is hidden" />
    </Field.Root>
  ),
};

export const Composed: Story = {
  render: () => (
    <Field.Root>
      <Field.Wrapper>
        <Field.Label>Label</Field.Label>
        <Field hint="hint" />
      </Field.Wrapper>
      <Field.Meta>Meta</Field.Meta>
    </Field.Root>
  ),
};

export const ComposedError: Story = {
  render: () => (
    <Field.Root>
      <Field.Wrapper>
        <Field.Label>Label</Field.Label>
        <Field error="error" hint="hint" />
      </Field.Wrapper>
      <Field.Meta>Meta</Field.Meta>
    </Field.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Column>
      {SIZES.map((size) => (
        <Field.Root key={size}>
          <Frame>
            <Field sizing={size as ComponentSizeEnum} placeholder={size} />
          </Frame>
        </Field.Root>
      ))}
    </Column>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Column>
      {SHAPES.map((shape) => (
        <Field.Root key={shape}>
          <Frame>
            <Field shape={shape} sizing="medium" placeholder={shape} />
          </Frame>
        </Field.Root>
      ))}
    </Column>
  ),
};

export const Variants: Story = {
  render: () => (
    <Column>
      {VARIANTS.map((variant) => (
        <Field.Root key={variant}>
          <Frame>
            <Field
              shape="smooth"
              sizing="medium"
              placeholder={variant}
              variant={variant as "primary"}
            />
          </Frame>
        </Field.Root>
      ))}
    </Column>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Column>
      <Field.Root>
        <Frame>
          <Field disabled placeholder="Disabled" />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Number disabled placeholder="Disabled number" controls />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Currency disabled defaultValue={12.5} suffix="€" />
        </Frame>
      </Field.Root>
    </Column>
  ),
};

export const Text: Story = {
  render: () => (
    <Column>
      <Field.Root>
        <Frame>
          <Field.Label>Text</Field.Label>
          <Field variant="secondary" placeholder="Placeholder..." />
          <Field.Meta variant="hint">
            This is a hint text to help user.
          </Field.Meta>
        </Frame>
      </Field.Root>
    </Column>
  ),
};

export const Suffix: Story = {
  render: () => (
    <Column>
      <Field.Root>
        <Frame>
          <Field.Label>Field with suffix</Field.Label>
          <Field suffix="kg" placeholder="Weight" />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Field with controls</Field.Label>
          <Field type="number" controls placeholder="Quantity" />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Field with controls and suffix</Field.Label>
          <Field type="number" controls suffix="kg" placeholder="Weight" />
        </Frame>
      </Field.Root>
    </Column>
  ),
};

export const NumberField: Story = {
  render: () => (
    <Column>
      <Field.Root>
        <Frame>
          <Field.Label>Number</Field.Label>
          <Field.Number placeholder="100" min={0} max={100} />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Number with controls</Field.Label>
          <Field.Number placeholder="100" min={0} max={100} controls />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Number with suffix</Field.Label>
          <Field.Number placeholder="100" min={0} max={100} suffix="%" />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>
            Number with controls and suffix (suffix hidden)
          </Field.Label>
          <Field.Number
            placeholder="100"
            min={0}
            max={100}
            controls
            suffix="%"
          />
        </Frame>
      </Field.Root>
    </Column>
  ),
};

export const CurrencyField: Story = {
  render: () => (
    <Column>
      <Field.Root>
        <Frame>
          <Field.Label>Price (USD)</Field.Label>
          <Field.Currency
            currency="USD"
            locale="en-US"
            min={0}
            defaultValue={1234.51}
            onChange={(v) => console.log(v)}
          />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Price (EUR, with suffix)</Field.Label>
          <Field.Currency
            currency="EUR"
            locale="fr-FR"
            suffix="€"
            min={0}
            defaultValue={1234.51}
            onChange={(v) => console.log(v)}
          />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Price (negative allowed)</Field.Label>
          <Field.Currency
            currency="EUR"
            locale="fr-FR"
            allowNegative
            defaultValue={-42}
          />
        </Frame>
      </Field.Root>
    </Column>
  ),
};

export const DateField: Story = {
  render: () => (
    <Column>
      <Field.Root>
        <Frame>
          <Field.Label>Date</Field.Label>
          <Field.Date variant="secondary" locale="en-US" />
          <Field.Meta variant="hint">
            This is a hint text to help user.
          </Field.Meta>
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Date and time</Field.Label>
          <Field.Date variant="secondary" locale="en-US" withTime suffix="⏱" />
        </Frame>
      </Field.Root>
    </Column>
  ),
};

export const FileField: Story = {
  render: () => (
    <Column>
      <Field.Root>
        <Frame>
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
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Upload (disabled)</Field.Label>
          <Field.File
            disabled
            trigger={<span className="fs-small-50">Upload</span>}
          />
        </Frame>
      </Field.Root>
    </Column>
  ),
};

export const PasswordField: Story = {
  render: () => (
    <Column>
      <Field.Root>
        <Frame>
          <Field.Label>Password</Field.Label>
          <Field.Password variant="secondary" sizing="medium" />
          <Field.Meta variant="hint">Must be at least 8 characters.</Field.Meta>
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Password (visible by default)</Field.Label>
          <Field.Password defaultType="text" defaultValue="hunter2" />
        </Frame>
      </Field.Root>
    </Column>
  ),
};

export const RangeField: Story = {
  render: () => (
    <Column>
      <Field.Root>
        <Frame>
          <Field.Label>With value display</Field.Label>
          <Field.Range defaultValue={40} suffix="%" />
        </Frame>
      </Field.Root>
      <Field.Root>
        <Frame>
          <Field.Label>Without value display</Field.Label>
          <Field.Range showValue={false} defaultValue={70} />
        </Frame>
      </Field.Root>
    </Column>
  ),
};

export const Tag = {
  render: ({ ...args }) => {
    const TAGS = ["Design", "Product", "Design System", "Engineering"];
    return (
      <Column>
        <Field.Root>
          <Field.Wrapper style={{ width: 325 }}>
            <Field.Label>Tags</Field.Label>
            <Field.Tag
              defaultValue={[String(TAGS.at(0)), String(TAGS.at(-1))]}
              onChange={(tags) => console.log(tags)}
              placeholder="Type and press Enter…"
              sizing="large"
              allowed={TAGS}
            />
            <div>
              <Field.Meta variant="emphasis">Allowed tags</Field.Meta>
              <div className="flex flex-wrap g-medium-10">
                {TAGS.map((tag, key) => (
                  <Field.Meta variant="hint">
                    {tag}
                    {key !== TAGS.length - 1 ? "," : "."}
                  </Field.Meta>
                ))}
              </div>
            </div>
          </Field.Wrapper>
        </Field.Root>
      </Column>
    );
  },
};
