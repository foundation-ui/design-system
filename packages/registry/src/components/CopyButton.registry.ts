import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const CopyButtonMeta: ComponentRegistryMetadata = {
  name: "CopyButton",
  description:
    "Copies a string value to the clipboard on click with tooltip feedback.",
  category: "input",
  variants: [
    "ghost",
    "primary",
    "secondary",
    "tertiary",
    "mono",
    "border",
    "danger",
    "warning",
    "success",
    "meta",
    "hint",
  ],
  title: "Copy Button",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "value",
      type: "string",
      required: true,
    },
    {
      name: "delay",
      type: "number",
    },
    {
      name: "tooltip",
      type: "{ copyLabel?: string; copiedLabel?: string; }",
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint" | "link" | "accent"',
      defaultValue: "ghost",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "shape",
      type: '"round" | "smooth" | "square"',
      defaultValue: "smooth",
    },
    {
      name: "animation",
      type: "reflective",
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
  usage: [
    `import React from "react";
import { CopyButton } from "@usefui/components";

function CopyButtonTemplate() {

    return (
      <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
        <CopyButton variant="border" sizing="medium" value="Hello, world!">
          Click to copy
        </CopyButton>
      </div>
    );

}

export default CopyButtonTemplate;`,
  ],
  anatomy: `import { CopyButton } from "@usefui/components";

export function CopyButtonComponent() {
    return (
      <CopyButton value="Hello, world!">Copy</CopyButton>
    );
}`,

  examples: [
    { kind: "note", title: "value prop with copy and copied tooltip labels" },
    {
      kind: "note",
      title: "delay before resetting copied state (default 1000ms)",
    },
    { kind: "note", title: "disabled when value is null" },
    { kind: "note", title: "inherits Button variant, sizing, rawicon" },
  ],
  a11y: {
    role: "button",
    keyboardNav: "Enter and Space activate",
    ariaAttributes: ["aria-label", "aria-disabled"],
  },
  relatedComponents: ["Button", "Tooltip", "Page"],
  aiHints: {
    useCases: [
      "copy API keys, invite codes, or snippets",
      "icon button beside readonly fields",
      "custom tooltip.copyLabel and copiedLabel",
    ],
    avoid: [
      "primary form submit actions",
      "huge strings without additional UX",
      "secrets without user awareness",
    ],
    composesWith: ["Tooltip", "Button"],
  },
};
