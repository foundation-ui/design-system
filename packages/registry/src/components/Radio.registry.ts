import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const RadioMeta: ComponentRegistryMetadata = {
  name: "Radio",
  description:
    "Select a single option from a set. Compound Root + Radio + Indicator, with optional Radio.Group for exclusive selection.",
  category: "input",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Ghost,
    "accent",
    "hint",
    "meta",
    "success",
    "danger",
    "warning",
  ],
  title: "Radio",
  props: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "children",
      type: "ReactNode",
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "accent" | "hint" | "meta" | "success" | "danger" | "warning"',
      defaultValue: "secondary",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "checked",
      type: "boolean",
    },
    {
      name: "value",
      type: "string",
    },
    {
      name: "onCheckedChange",
      type: "(checked: boolean) => void",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "onChange",
      type: "(event: ChangeEvent<HTMLInputElement>) => void",
    },
  ],
  parts: {
    Root: {
      description: "Contains the Radio component provider.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Group: {
      description:
        "Shares name, value and disabled state between radios and keeps the selection exclusive.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "value",
          type: "string",
        },
        {
          name: "defaultValue",
          type: "string",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
        },
      ],
    },
    Indicator: {
      description:
        "Radio.Indicator renders the built-in selected dot as an svg reflecting the checked state. Props are forwarded to the svg element.",
      props: [
        {
          name: "aria-hidden",
          type: "boolean",
          defaultValue: "true",
        },
      ],
    },
  },
  usage: [
    `import { Radio, Field } from "@usefui/components";

export function RadioComponent() {
    const [value, setValue] = React.useState("a");
    return (
      <Radio.Group name="group" value={value} onValueChange={setValue}>
        {["a", "b", "c"].map((item) => (
          <Field.Label key={item} htmlFor={item} className="flex align-center g-medium-30" optional>
            <Radio value={item}>
              <Radio.Indicator />
            </Radio>
            <Field.Meta variant="emphasis">{item}</Field.Meta>
          </Field.Label>
        ))}
      </Radio.Group>
    );
}`,
  ],
  anatomy: `import { Radio } from "@usefui/components";

export function RadioComponent() {
    return (
      <Radio.Root>
        <Radio>
          <Radio.Indicator />
        </Radio>
      </Radio.Root>
    );
}`,

  examples: [
    { kind: "note", title: "Radio.Root > Radio + Radio.Indicator" },
    { kind: "note", title: "Radio.Group for exclusive selection" },
    { kind: "note", title: "DefaultChecked story for initial state" },
    { kind: "note", title: "Sizes and Variants stories" },
    {
      kind: "note",
      title:
        "defaultChecked for uncontrolled state; checked + onCheckedChange for controlled state",
    },
  ],
  a11y: {
    role: "native radio input; wrapper role none",
    keyboardNav: "Arrow keys move between radios in a group; Space selects",
    ariaAttributes: [
      "aria-checked",
      "aria-disabled",
      "aria-required",
      "aria-label",
    ],
  },
  relatedComponents: ["Field", "Checkbox", "Switch", "Page"],
  aiHints: {
    useCases: [
      "single choice from a set of options",
      "labeled option lists with Field",
      "forms with required selection",
    ],
    avoid: [
      "multiple selection — use Checkbox",
      "boolean toggle — use Switch",
      "large option sets — use Select",
    ],
    composesWith: [
      "Radio.Root",
      "Radio.Group",
      "Radio.Indicator",
      "Field.Label",
      "Field.Meta",
    ],
  },
};