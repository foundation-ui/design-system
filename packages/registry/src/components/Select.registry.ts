import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const SelectMeta: ComponentRegistryMetadata = {
  name: "Select",
  description:
    "Single choice from a list. Combobox trigger with listbox content and scrollable options.",
  category: "input",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Ghost,
    ComponentVariantEnum.Hint,
    ComponentVariantEnum.Meta,
    ComponentVariantEnum.Success,
    ComponentVariantEnum.Danger,
    ComponentVariantEnum.Warning,
    "link",
    "accent",
  ],
  title: "Select",
  props: [],
  parts: {
    Root: {
      description: "Contains the Select component provider.",
      props: [
        {
          name: "children",
          type: "React.ReactElement",
          required: true,
        },
      ],
    },
    Trigger: {
      description:
        "Select.Trigger is used to expand and collapse the associated Select.Content component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "error",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
          defaultValue: "secondary",
        },
        {
          name: "shape",
          type: '"square" | "smooth" | "round"',
          defaultValue: "smooth",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "rawicon",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
    Content: {
      description:
        "Select.Content is used to contains the options of the associated Select.Trigger component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "defaultOpen",
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
    Item: {
      description: "Select.Item is an option rendered inside Select.Content.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "value",
          type: "string",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>) => void",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
  },

  examples: [
    { kind: "note", title: "Select.Root > Select > Trigger + Content > Item" },
    { kind: "note", title: "Trigger error and disabled states" },
    {
      kind: "note",
      title: "Field.Wrapper + Field.Label + Field.Meta in Default story",
    },
    { kind: "note", title: "Space/Enter on item; Escape closes" },
  ],
  a11y: {
    role: "combobox, listbox, option",
    keyboardNav: "Space/Enter select; Escape close; click-outside dismiss",
    ariaAttributes: [
      "aria-haspopup",
      "aria-expanded",
      "aria-controls",
      "aria-selected",
      "aria-disabled",
    ],
  },
  relatedComponents: ["ScrollArea", "Field", "Button", "Page"],
  aiHints: {
    useCases: [
      "single-choice pickers in forms",
      "custom trigger label showing selection",
      "validation via Trigger error prop",
    ],
    avoid: [
      "multi-select or typeahead combobox",
      "native form submit without wiring value to state",
      "very long lists without performance plan",
    ],
    composesWith: [
      "Select.Root",
      "Select.Trigger",
      "Select.Content",
      "Select.Item",
      "ScrollArea",
      "Field",
    ],
  },
};
