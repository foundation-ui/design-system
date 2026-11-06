import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const ActionSwapMeta: ComponentRegistryMetadata = {
  name: "ActionSwap",
  title: "ActionSwap",
  description:
    "Swaps its label between two actions on click and reverts after a delay. Renders a Button, so Button styling and behavior props are forwarded. ActionSwap.Copy adds clipboard feedback with a document.execCommand fallback when the Clipboard API is unavailable.",
  category: "input",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Ghost,
    ComponentVariantEnum.Danger,
    ComponentVariantEnum.Warning,
    ComponentVariantEnum.Success,
    ComponentVariantEnum.Meta,
    ComponentVariantEnum.Hint,
    "link",
    "accent",
  ],
  props: [
    {
      name: "children",
      type: "ReactNode",
    },
    {
      name: "actions",
      type: "ReactNode[]",
      required: true,
    },
    {
      name: "delay",
      type: "number",
      defaultValue: "1000",
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
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "rawicon",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent<HTMLButtonElement>) => void",
    },
  ],
  parts: {
    Copy: {
      description:
        "ActionSwap.Copy writes `value` to the clipboard and renders a Button that swaps between the default `Copy` and `Copied` labels.",
      props: [
        {
          name: "value",
          type: "string",
        },
        {
          name: "actions",
          type: "ReactNode[]",
          defaultValue: '["Copy", "Copied"]',
        },
        {
          name: "delay",
          type: "number",
          defaultValue: "1000",
        },
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
  },
  examples: [
    {
      kind: "executable",
      title: "Swap between two labels",
      code: `import { ActionSwap } from "@usefui/components";

export function Component() {
  return <ActionSwap actions={["Click here", "Nice click"]} />;
}`,
    },
    {
      kind: "executable",
      title: "Copy a value to the clipboard",
      code: `import { ActionSwap } from "@usefui/components";

export function Component() {
  return (
    <ActionSwap.Copy
      value="usefui"
      variant="secondary"
      sizing="small"
      shape="round"
      animation="reflective"
    />
  );
}`,
    },
    {
      kind: "note",
      title: "Visible labels come from actions",
      description:
        "ActionSwap and ActionSwap.Copy render `actions[0]`, then `actions.at(-1)` after a click. `children` is accepted by the prop type but is not rendered, so pass labels through `actions`.",
    },
    {
      kind: "note",
      title: "delay controls how long the second action stays visible",
      description:
        "The component reverts to the first action after `delay` milliseconds. Keep it short enough to feel responsive; the default is 1000ms.",
    },
    {
      kind: "note",
      title: "ActionSwap.Copy falls back to document.execCommand",
      description:
        "When navigator.clipboard.writeText rejects, the component creates a temporary textarea, selects it, and runs execCommand('copy').",
    },
  ],
  a11y: {
    role: "button (rendered by Button)",
    keyboardNav:
      "Enter and Space activate the button; focus follows native button behavior.",
    ariaAttributes: ["aria-label", "aria-description", "aria-disabled"],
  },
  relatedComponents: ["Button", "Tooltip"],
  aiHints: {
    useCases: [
      "copy-to-clipboard feedback",
      "toggle between two short labels on click",
      "one-shot confirmation after a destructive or irreversible action",
    ],
    avoid: [
      "persistent state controls such as switches or toggles",
      "labels that need to remain visible longer than a moment",
      "replacing a full Button that already owns its own feedback",
    ],
    composesWith: ["Button", "ActionSwap.Copy", "Tooltip"],
  },
};
