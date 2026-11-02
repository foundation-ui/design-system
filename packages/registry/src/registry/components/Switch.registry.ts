import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const SwitchMeta: ComponentRegistryMetadata = {
  name: "Switch",
  description:
    "Toggle a boolean setting on or off. Compound Root + Switch + Thumb.",
  category: "input",
  variants: ["primary", "accent"],
  title: "Switch",
  props: [
    {
      name: "children",
      type: "ReactNode",
    },
    {
      name: "variant",
      type: '"primary" | "accent"',
      defaultValue: "primary",
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
      name: "value",
      type: "string",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent<HTMLButtonElement>) => void",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  parts: {
    Root: {
      description: "Contains the Switch component provider.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Thumb: {
      description:
        "Switch.Thumb is used to show users the current state of the Switch.",
      props: [
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
      ],
    },
  },
  usage: [
    `import { Switch } from "@usefui/components";

export function SwitchComponent() {
    return (
      <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
      </div>
    );
}`,
  ],
  anatomy: `import { Switch } from "@usefui/components";

export function SwitchComponent() {
    return (
      <Switch.Root>
        <Switch>
          <Switch.Thumb />
        </Switch>
      </Switch.Root>
    );
}`,

  examples: [
    { kind: "note", title: "Switch.Root > Switch + Switch.Thumb" },
    { kind: "note", title: "DefaultChecked, Sizes, Variants stories" },
    { kind: "note", title: "labeled with Field.Label and Field.Meta" },
    { kind: "note", title: "defaultChecked and disabled props" },
  ],
  a11y: {
    role: "switch on trigger",
    keyboardNav: "Space and Enter toggle",
    ariaAttributes: ["aria-checked", "aria-label", "aria-disabled"],
  },
  relatedComponents: ["Field", "Toggle", "Button", "Page"],
  aiHints: {
    useCases: [
      "settings toggles: notifications, dark mode",
      "labeled boolean preferences with Field",
    ],
    avoid: [
      "multi-option choice — use Select or radio",
      "immediate submit actions — use Button",
      "unlabeled switch in forms",
    ],
    composesWith: ["Switch.Root", "Switch.Thumb", "Field.Label", "Field.Meta"],
  },
};
