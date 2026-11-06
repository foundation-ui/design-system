import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const FieldMeta: ComponentRegistryMetadata = {
  name: "Field",
  description:
    "Input with label, hint, and error messaging. Specialized variants for number, currency, date, range, file, and password.",
  category: "input",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Ghost,
  ],
  title: "Field",
  props: [
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
      defaultValue: "secondary",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "shape",
      type: '"square" | "smooth" | "round"',
      defaultValue: "smooth",
    },
    {
      name: "error",
      type: "string",
    },
    {
      name: "hint",
      type: "string",
    },
    {
      name: "suffix",
      type: "string",
    },
    {
      name: "controls",
      type: "boolean",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  parts: {
    Root: {
      description: "Contains the Field component provider.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Wrapper: {
      description:
        "Field.Wrapper groups the input with label, helper text, and meta.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Label: {
      description:
        "Field.Label is used associated to a Field component to conain the label text.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "optional",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
    Meta: {
      description:
        "Field.Meta is used associated to a Field component to convey additional informations.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: '"default" | "hint" | "emphasis" | "error"',
          defaultValue: "emphasis",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
    Number: {
      description:
        "Field.Number is a numeric input with increment and decrement controls.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Date: {
      description:
        "Field.Date is a date picker with locale and optional time support.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    File: {
      description: "Field.File is a file upload input with custom trigger.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Password: {
      description: "Field.Password is a password input with show/hide toggle.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Currency: {
      description:
        "Field.Currency is a locale-aware monetary input emitting a plain number or null.",
      props: [
        {
          name: "value",
          type: "number | null",
        },
        {
          name: "defaultValue",
          type: "number | null",
        },
        {
          name: "onChange",
          type: "(value: number | null) => void",
        },
        {
          name: "currency",
          type: "string",
          defaultValue: "EUR",
        },
        {
          name: "locale",
          type: "string",
        },
        {
          name: "suffix",
          type: "string",
        },
        {
          name: "min",
          type: "number",
        },
        {
          name: "max",
          type: "number",
        },
        {
          name: "step",
          type: "number",
        },
        {
          name: "allowNegative",
          type: "boolean",
        },
      ],
    },
    Range: {
      description:
        "Field.Range is a slider input wrapping the native input type range.",
      props: [
        {
          name: "value",
          type: "number",
        },
        {
          name: "defaultValue",
          type: "number",
        },
        {
          name: "onChange",
          type: "(value: number) => void",
        },
        {
          name: "min",
          type: "number",
          defaultValue: "0",
        },
        {
          name: "max",
          type: "number",
          defaultValue: "100",
        },
        {
          name: "step",
          type: "number",
          defaultValue: "1",
        },
        {
          name: "suffix",
          type: "string",
        },
        {
          name: "showValue",
          type: "boolean",
          defaultValue: "true",
        },
        {
          name: "hint",
          type: "string",
        },
        {
          name: "error",
          type: "string",
        },
      ],
    },
    Tag: {
      description:
        "Field.Tag is a tag input that commits values on Enter and renders removable tag pills.",
      props: [
        {
          name: "value",
          type: "string[]",
        },
        {
          name: "defaultValue",
          type: "string[]",
        },
        {
          name: "allowed",
          type: "string[]",
        },
        {
          name: "onChange",
          type: "(tags: string[]) => void",
        },
        {
          name: "error",
          type: "string",
        },
        {
          name: "disabled",
          type: "boolean",
        },
        {
          name: "placeholder",
          type: "string",
        },
        {
          name: "id",
          type: "string",
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint"',
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
        },
        {
          name: "shape",
          type: '"round" | "smooth" | "square"',
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
  },
  usage: [
    `import { Field } from "@usefui/components";

export function FieldComponent() {
    return (
        <div className="grid align-center justify-center g-medium-60 p-t-large-30 p-x-medium-60">
            <Field.Root>
                <Field.Wrapper>
                    <Field.Label htmlFor="demo-field">Label</Field.Label>
                    <Field
                        name="demo-field"
                        variant="secondary"
                        placeholder="Placeholder.."
                    />
                    <Field.Meta variant="hint">Field meta</Field.Meta>
                </Field.Wrapper>
            </Field.Root>
            <Field.Root>
                <Field.Wrapper>
                    <Field.Label htmlFor="demo-field-2">Label</Field.Label>
                    <Field
                        name="demo-field-2"
                        variant="secondary"
                        placeholder="Placeholder.."
                        error="Error"
                    />
                    <Field.Meta variant="hint">Field meta</Field.Meta>
                </Field.Wrapper>
            </Field.Root>
        </div>
    );

}`,
  ],
  anatomy: `import { Field } from "@usefui/components";

export function FieldComponent() {
    return (
      <Field.Root>
        <Field.Wrapper>
          <Field.Label htmlFor="demo-field">Label</Field.Label>
          <Field />
        </Field.Wrapper>
      </Field.Root>
    );
}`,

  examples: [
    {
      kind: "note",
      title: "Field.Root > Field.Wrapper > Label + Field + Meta",
    },
    { kind: "note", title: "Field.Number with increment/decrement" },
    { kind: "note", title: "Field.Date with locale and withTime" },
    { kind: "note", title: "Field.File with custom trigger" },
    { kind: "note", title: "Field.Password and Field.Currency stories" },
    { kind: "note", title: "Field.Range slider with showValue and hint" },
    {
      kind: "note",
      title: "Field.Tag for committed, removable tag values",
    },
  ],
  a11y: {
    role: "input, group, spinbutton segments on Date, slider on Range",
    keyboardNav: "Native input behavior; Range is a native range slider",
    ariaAttributes: [
      "aria-invalid",
      "aria-describedby",
      "aria-errormessage",
      "aria-details",
    ],
  },
  relatedComponents: [
    "Textarea",
    "Select",
    "OTPField",
    "Checkbox",
    "Button",
    "Badge",
  ],
  aiHints: {
    useCases: [
      "labeled forms with hint and error states",
      "numeric, currency, date, range, file, password inputs",
      "composed layouts via Field.Meta variants",
    ],
    avoid: [
      "multi-line text — use Textarea",
      "OTP codes — use OTPField",
      "boolean toggles — use Checkbox or Switch",
    ],
    composesWith: [
      "Field.Root",
      "Field.Wrapper",
      "Field.Label",
      "Field.Meta",
      "Field.Number",
      "Field.Currency",
      "Field.Date",
      "Field.Range",
      "Field.File",
      "Field.Password",
      "Field.Tag",
    ],
  },
};
