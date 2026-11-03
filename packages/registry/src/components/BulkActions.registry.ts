import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const BulkActionsMeta: ComponentRegistryMetadata = {
  name: "BulkActions",
  title: "BulkActions",
  description:
    "Floating action panel for operating on a selection. The panel renders only while open, anchors to a viewport side with a configurable gap, and can be toggled by a global keyboard shortcut. BulkActions.Handle adds pointer dragging and BulkActions.Item exposes activity statuses.",
  category: "data",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Ghost,
  ],
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "side",
      type: '"top" | "right" | "bottom" | "left"',
      defaultValue: "bottom",
    },
    {
      name: "gap",
      type: "number",
      defaultValue: "6",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "small",
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
      defaultValue: "primary",
    },
    {
      name: "shape",
      type: '"square" | "smooth" | "round"',
      defaultValue: "smooth",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "shortcut",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "hotkey",
      type: "string",
    },
    {
      name: "bindkey",
      type: '"ctrlKey" | "metaKey" | "altKey" | "shiftKey"',
    },
  ],
  parts: {
    Root: {
      description:
        "Contains the bulk actions provider. It renders no DOM element and only accepts children.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Trigger: {
      description:
        "Button that toggles the panel open and closed. Renders a Button, so Button props are forwarded.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint" | "link" | "accent"',
          defaultValue: "primary",
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
          name: "animation",
          type: '"reflective"',
        },
        {
          name: "sound",
          type: "SoundName",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
        },
      ],
    },
    Handle: {
      description:
        "Draggable handle that repositions the floating panel with the pointer. Renders a Button with a grab cursor.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint" | "link" | "accent"',
          defaultValue: "ghost",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "small",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "onMouseDown",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
        },
      ],
    },
    Item: {
      description:
        "Individual action inside the panel. `status` drives the pending blink, the processing activity dot, and the running scale.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "status",
          type: '"idle" | "pending" | "processing" | "running"',
          defaultValue: "idle",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Trigger, draggable handle, and status items",
      code: `import { BulkActions } from "@usefui/components";

export function Component() {
  return (
    <BulkActions.Root>
      <BulkActions.Trigger variant="secondary" sizing="small">
        Selection actions
      </BulkActions.Trigger>

      <BulkActions side="bottom" variant="secondary" shape="round">
        <BulkActions.Handle>⋮⋮</BulkActions.Handle>
        <BulkActions.Item status="pending">Archive</BulkActions.Item>
        <BulkActions.Item status="processing">Move</BulkActions.Item>
        <BulkActions.Item status="running">Export</BulkActions.Item>
      </BulkActions>
    </BulkActions.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Toggle with a keyboard shortcut",
      code: `import { BulkActions } from "@usefui/components";

export function Component() {
  return (
    <BulkActions.Root>
      <BulkActions.Trigger>Toggle actions</BulkActions.Trigger>
      <BulkActions shortcut hotkey="B" bindkey="shiftKey" side="bottom" gap={16}>
        <BulkActions.Item>Archive</BulkActions.Item>
      </BulkActions>
    </BulkActions.Root>
  );
}`,
    },
    {
      kind: "note",
      title: "The panel is unmounted while closed",
      description:
        "BulkActions returns null until the provider state is open, so child effects and measurements only run after the first open.",
    },
    {
      kind: "note",
      title: "Anchoring is viewport-based and clamped",
      description:
        "Position is computed from the chosen `side` and `gap`, then clamped so the panel stays inside the viewport. The panel re-anchors on resize while open.",
    },
    {
      kind: "note",
      title: "Handle dragging is pointer-driven",
      description:
        "BulkActions.Handle listens for mousedown and tracks the document until mouseup. It is not keyboard-operable on its own; provide an alternative when repositioning matters.",
    },
  ],
  a11y: {
    role: "No explicit role; the wrapper is a styled div",
    keyboardNav:
      'Trigger and Handle render Buttons and inherit Enter/Space activation. Items are divs and are not focusable. Add role="toolbar", an aria-label, and focusable controls when the panel is used as a toolbar.',
    ariaAttributes: [
      "aria-label (recommended on the panel)",
      "aria-disabled (Trigger and Handle via Button)",
    ],
  },
  relatedComponents: [
    "Button",
    "Checkbox",
    "DataTable",
    "Tooltip",
    "Whiteboard",
  ],
  aiHints: {
    useCases: [
      "batch operations after multi-select in a table",
      "floating contextual actions on a canvas",
      "keyboard-triggered action rails with a draggable handle",
    ],
    avoid: [
      "primary page navigation",
      "relying on Items for keyboard access without adding focusable controls",
      "rendering the panel before it is opened — it is unmounted until then",
      "long forms or content that needs a scroll container",
    ],
    composesWith: [
      "BulkActions.Root",
      "BulkActions.Trigger",
      "BulkActions.Handle",
      "BulkActions.Item",
      "Button",
      "DataTable",
    ],
  },
};
