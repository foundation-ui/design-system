import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const TooltipMeta: ComponentRegistryMetadata = {
  name: "Tooltip",
  description:
    "Additional information on hover with optional shortcut hint badge.",
  category: "feedback",
  variants: ["primary", "secondary"],
  title: "Tooltip",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "content",
      type: "string",
      required: true,
    },
    {
      name: "hint",
      type: "string",
    },
    {
      name: "delay",
      type: "number",
      defaultValue: "200",
    },
    {
      name: "variant",
      type: '"primary" | "secondary"',
      defaultValue: "primary",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  usage: [
    `import React from "react";
import { Tooltip } from "@usefui/components";

function TooltipTemplate() {

    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">

        </div>
    );

}

export default TooltipTemplate;`,
  ],
  anatomy: `import { Tooltip } from "@usefui/components";

export function TooltipComponent() {
    return (
      <Tooltip content="Helper text">Text</Tooltip>
    );
}`,

  examples: [
    { kind: "note", title: "content required; children as hover trigger" },
    { kind: "note", title: "hint prop for keyboard shortcut badge" },
    { kind: "note", title: "delay default 200ms" },
    { kind: "note", title: "variant primary or secondary; sizing on popup" },
  ],
  a11y: {
    role: "tooltip on popup",
    keyboardNav: "Hover only — no focus trigger in source",
    ariaAttributes: ["data-state"],
  },
  relatedComponents: ["CopyButton", "Badge", "Page"],
  aiHints: {
    useCases: [
      "icon-only control supplementary labels",
      "truncated text expansion on hover",
      "shortcut hints via hint prop",
    ],
    avoid: [
      "essential information only on hover",
      "long or interactive tooltip content",
      "replacing aria-label on icon buttons",
    ],
    composesWith: ["CopyButton", "Badge"],
  },
};
