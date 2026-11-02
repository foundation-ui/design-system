import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const TextareaMeta: ComponentRegistryMetadata = {
  name: "Textarea",
  description:
    "Multi-line text input with auto-grow, optional resize, and Field-aligned styling.",
  category: "input",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
    ComponentVariantEnum.Ghost,
  ],
  title: "Textarea",
  props: [
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
      defaultValue: "secondary",
    },
    {
      name: "resizable",
      type: "boolean",
      defaultValue: "true",
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
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  usage: [
    `import React from "react";
import { Textarea } from "@usefui/components";

function TextareaTemplate() {

    return (
      <div className="grid align-center g-medium-60 justify-center p-t-large-30 p-x-medium-60">
        {(["small", "medium", "large"] as const).map((size, key) => (
          <Textarea key={key} sizing={size} />
        ))}
      </div>
    );

}

export default TextareaTemplate;`,
  ],
  anatomy: `import { Textarea } from "@usefui/components";

export function TextareaComponent() {
    return <Textarea />;
}`,

  examples: [
    { kind: "note", title: "inside Field.Wrapper with label" },
    { kind: "note", title: "Sizes and Variants stories" },
    { kind: "note", title: "resizable prop for manual resize" },
    { kind: "note", title: "auto-height via scrollHeight on change" },
  ],
  a11y: {
    role: "native textarea",
    keyboardNav: "Standard text input",
    ariaAttributes: ["use with Field.Label htmlFor and aria-invalid"],
  },
  relatedComponents: ["Field", "Page"],
  aiHints: {
    useCases: [
      "comments, descriptions, bio fields",
      "auto-growing notes in forms",
    ],
    avoid: [
      "single-line input — use Field",
      "rich text — needs dedicated editor",
      "unlabeled required fields",
    ],
    composesWith: ["Field.Wrapper", "Field.Label", "Field.Meta"],
  },
};
