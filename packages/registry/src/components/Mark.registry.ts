import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const MarkMeta: ComponentRegistryMetadata = {
  name: "Mark",
  description:
    "Inline highlighted text fragment with gradient or inset-shadow treatments.",
  category: "data",
  variants: [
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Border,
  ],
  title: "Mark",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "border" | "mono" | "ghost" | "success" | "warning" | "danger" | "hint" | "meta"',
      defaultValue: "primary",
    },
    {
      name: "fontFamily",
      type: '"monospace" | "inherit"',
      defaultValue: "inherit",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  usage: [
    `import { Mark } from "@usefui/components";

export function MarkComponent() {
    return (
        <p>
            Highlight <Mark>important</Mark> terms inline, or use{" "}
            <Mark fontFamily="monospace">code-like</Mark> fragments.
        </p>
    );
}`,
  ],
  anatomy: `import { Mark } from "@usefui/components";

export function MarkComponent() {
    return <Mark>highlighted</Mark>;
}`,
  examples: [
    { kind: "note", title: "inline text highlight inside paragraphs" },
    { kind: "note", title: "monospace fragments for identifiers" },
    { kind: "note", title: "primary gradient, secondary/tertiary inset" },
  ],
  a11y: {
    role: "span (presentational)",
    keyboardNav: "Not interactive",
    ariaAttributes: [],
  },
  relatedComponents: ["Badge", "Divider"],
  aiHints: {
    useCases: [
      "highlighting key terms in prose",
      "inline monospace identifiers",
      "decorative emphasis inside paragraphs",
    ],
    avoid: [
      "interactive labels — use Button or Badge",
      "block-level containers — use Card or Banner",
      "replacing semantic <mark> search highlighting with unique meaning",
    ],
    composesWith: ["Badge"],
  },
};
