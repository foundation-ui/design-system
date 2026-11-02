import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const BadgeMeta: ComponentRegistryMetadata = {
  name: "Badge",
  description: "Conveys data or states to users as a compact chip or label.",
  category: "feedback",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Ghost,
    ComponentVariantEnum.Meta,
    ComponentVariantEnum.Hint,
    ComponentVariantEnum.Success,
    ComponentVariantEnum.Warning,
    ComponentVariantEnum.Danger,
  ],
  title: "Badge",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint"',
      defaultValue: "primary",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "small",
    },
    {
      name: "shape",
      type: '"square" | "smooth" | "round"',
      defaultValue: "smooth",
    },
    {
      name: "emphasis",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  usage: [
    `import React from "react";
import { Badge } from "@usefui/components";

function BadgeTemplate() {

    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
            <div className="flex align-center g-medium-10 justify-center">
                {([
                "primary",
                "secondary",
                "border",
                "danger",
                "warning",
                "success",
                "meta",
                ] as const).map((variant, key) => (
                <Badge
                    key={key}
                    variant={variant}
                >
                    @fui
                </Badge>
                ))}
            </div>
            <div className="flex align-center g-medium-10 justify-center">
                {(["square", "smooth", "round"] as const).map((shape, key) => (
                <Badge key={key} shape={shape}>
                    @fui
                </Badge>
                ))}
            </div>
        </div>
    );

}

export default BadgeTemplate;`,
  ],
  anatomy: `import { Badge } from "@usefui/components";

export function BadgeComponent() {
    return (
      <Badge>New</Badge>
    );
}`,

  examples: [
    { kind: "note", title: "status labels: New, Beta, count pills" },
    { kind: "note", title: "semantic variants: success, warning, danger" },
    { kind: "note", title: "emphasis flag for primary callouts" },
    { kind: "note", title: "Shapes and Sizes stories" },
    { kind: "note", title: "shortcut hints in Dialog menus" },
  ],
  a11y: {
    role: "div (presentational)",
    keyboardNav: "Not interactive",
    ariaAttributes: [],
  },
  relatedComponents: ["Avatar", "Dialog", "Dropdown", "Field", "MessageBubble"],
  aiHints: {
    useCases: [
      "metadata next to titles or table cells",
      "keyboard shortcut hints in menus",
      "status or count indicators",
    ],
    avoid: [
      "interactive affordances — use Button",
      "color-only status without text",
      "paragraph-length copy",
    ],
    composesWith: ["Dialog", "Dropdown", "Field", "MessageBubble.Content"],
  },
};
