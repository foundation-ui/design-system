import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ShimmerMeta: ComponentRegistryMetadata = {
  name: "Shimmer",
  description:
    "Animated shimmer gradient on inline text for loading or pending labels.",
  category: "feedback",
  variants: [],
  title: "Shimmer",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "duration",
      type: "number",
      defaultValue: "2",
    },
    {
      name: "spread",
      type: "number",
      defaultValue: "200",
    },
    {
      name: "shimmerColor",
      type: "string",
      defaultValue: "var(--font-color-alpha-60)",
    },
    {
      name: "baseColor",
      type: "string",
      defaultValue: "var(--font-color-alpha-30)",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],

  examples: [
    { kind: "note", title: "duration, spread, shimmerColor, baseColor props" },
    {
      kind: "note",
      title: "SlowAnimation, FastAnimation, WideSpread, CustomColors stories",
    },
    { kind: "note", title: "Group story for multiple pending lines" },
    { kind: "note", title: "short inline loading text only" },
  ],
  a11y: {
    role: "span with aria-label shimmer-text default",
    keyboardNav: "Not focusable",
    ariaAttributes: ["aria-label"],
  },
  relatedComponents: ["Skeleton", "Page"],
  aiHints: {
    useCases: [
      "inline loading headings or status lines",
      "branded pending text via custom colors",
      "multiple pending labels in Group",
    ],
    avoid: [
      "full-page or block placeholders — use Skeleton",
      "sole loading indicator without aria-live or visible Loading text",
      "long paragraphs",
    ],
    composesWith: ["Page"],
  },
};
