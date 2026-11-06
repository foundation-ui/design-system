import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const PillMeta: ComponentRegistryMetadata = {
  name: "Pill",
  title: "Pill",
  description:
    "Small status dot used to mark presence, state, or unread activity. It renders a styled div with a colored fill and an optional pulse ring, can be positioned against a parent corner with `fixed`, and maps status to the success, warning, and danger palette.",
  category: "feedback",
  variants: [],
  props: [
    {
      name: "status",
      type: '"success" | "warning" | "danger"',
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "small",
    },
    {
      name: "shape",
      type: '"square" | "smooth" | "round"',
      defaultValue: "round",
    },
    {
      name: "pulse",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "fixed",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "color",
      type: "string",
    },
    {
      name: "aria-label",
      type: "string",
      defaultValue: "`${sizing}-pill`",
    },
    {
      name: "children",
      type: "ReactNode",
    },
    {
      name: "className",
      type: "string",
    },
  ],
  examples: [
    {
      kind: "executable",
      title: "Status dots",
      code: `import { Pill } from "@usefui/components";

export function Component() {
  return (
    <div className="flex align-center g-medium-30">
      <Pill status="success" aria-label="Online" />
      <Pill status="warning" aria-label="Away" />
      <Pill status="danger" aria-label="Offline" />
    </div>
  );
}`,
    },
    {
      kind: "executable",
      title: "Fixed badge on an avatar",
      code: `import { Avatar, Pill } from "@usefui/components";

export function Component() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Avatar />
      <Pill status="success" fixed pulse sizing="small" aria-label="Available" />
    </div>
  );
}`,
    },
    {
      kind: "note",
      title:
        "`fixed` positions the pill against the nearest positioned ancestor",
      description:
        "The pill is absolutely positioned to the bottom-right corner of its parent. Give the parent `position: relative` so the badge anchors to the intended element.",
    },
    {
      kind: "note",
      title: "`color` overrides the status palette",
      description:
        "When `color` is passed it wins over the status-derived background color. `status` also adds a `bg-*` utility class used by the stylesheet.",
    },
    {
      kind: "note",
      title: "The default label is generic",
      description:
        "Without an `aria-label`, the pill is announced as `${sizing}-pill`. Always pass a meaningful label when the dot conveys state.",
    },
  ],
  a11y: {
    role: "div (presentational)",
    keyboardNav: "Not focusable and not interactive.",
    ariaAttributes: [
      "aria-label (defaults to the sizing string)",
      'role (add role="status" or a descriptive wrapper label when the state matters)',
    ],
  },
  relatedComponents: ["Badge", "Avatar", "Banner"],
  aiHints: {
    useCases: [
      "online, away, and offline presence dots",
      "unread or activity indicators over avatars and icons",
      "custom-colored status markers",
    ],
    avoid: [
      "conveying status through color alone — pair it with text or an aria-label",
      "using a Pill as a clickable element",
      "placing `fixed` pills without a positioned parent",
      "long labels — the dot has no content area",
    ],
    composesWith: ["Avatar", "Badge", "Button", "Tooltip"],
  },
};
