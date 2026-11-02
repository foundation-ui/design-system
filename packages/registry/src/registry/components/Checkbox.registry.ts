import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const CheckboxMeta: ComponentRegistryMetadata = {
  name: "Checkbox",
  description:
    "Select one or more options from a set. Requires Root for indicator sync.",
  category: "input",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Ghost,
    "accent",
  ],
  title: "Checkbox",
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
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint" | "accent"',
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
      name: "value",
      type: "string",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent<HTMLInputElement>) => void",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  parts: {
    Root: {
      description: "Contains the Checkbox component provider.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Indicator: {
      description:
        "Checkbox.Indicator renders the built-in check icon as an svg reflecting the checked state. Props are forwarded to the svg element; it no longer accepts custom children overrides.",
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
    `import { Checkbox } from "@usefui/components";

export function CheckboxComponent() {
    return (
      <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
        <div className="flex align-center g-medium-10 justify-center">
          {(["primary", "mono", "border", "ghost"] as const).map(
            (variant, key) => (
              <Checkbox.Root key={key}>
                <Checkbox
                  defaultChecked
                  key={key}
                  variant={variant}
                >
                  <Checkbox.Indicator />
                </Checkbox>
              </Checkbox.Root>
            ),
          )}
        </div>
        <div className="flex align-center g-medium-10 justify-center">
          {(["small", "medium", "large"] as const).map((size, key) => (
            <Checkbox.Root key={key}>
              <Checkbox sizing={size}>
                <Checkbox.Indicator />
              </Checkbox>
            </Checkbox.Root>
          ))}
        </div>
      </div>
    );
}`,
  ],
  anatomy: `import { Checkbox } from "@usefui/components";

export function CheckboxComponent() {
    return (
      <Checkbox.Root>
        <Checkbox>
          <Checkbox.Indicator />
        </Checkbox>
      </Checkbox.Root>
    );
}`,

  examples: [
    { kind: "note", title: "Checkbox.Root > Checkbox + Checkbox.Indicator" },
    { kind: "note", title: "labeled row with Field.Label and Field.Meta" },
    { kind: "note", title: "DefaultChecked story for initial state" },
    { kind: "note", title: "Sizes and Variants stories" },
    { kind: "note", title: "terms acceptance with required" },
  ],
  a11y: {
    role: "native checkbox input; wrapper role checkbox aria-hidden",
    keyboardNav: "Space toggles native input",
    ariaAttributes: [
      "aria-checked",
      "aria-disabled",
      "aria-required",
      "aria-label",
    ],
  },
  relatedComponents: ["Field", "Switch", "Page"],
  aiHints: {
    useCases: [
      "multi-select filters or preferences",
      "labeled option lists with Field",
      "required terms checkbox",
    ],
    avoid: [
      "use without Checkbox.Root",
      "mutually exclusive choices — use radio pattern",
      "single boolean without visible label",
    ],
    composesWith: [
      "Checkbox.Root",
      "Checkbox.Indicator",
      "Field.Label",
      "Field.Meta",
    ],
  },
};
