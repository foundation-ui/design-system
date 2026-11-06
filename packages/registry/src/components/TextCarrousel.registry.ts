import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const TextCarrouselMeta: ComponentRegistryMetadata = {
  name: "TextCarrousel",
  title: "TextCarrousel",
  description:
    "Cycles through a list of short text messages, either automatically on an interval or manually on click. It renders a single centered inline span and is intended for compact rotating copy such as announcements or tips.",
  category: "data",
  variants: [],
  props: [
    {
      name: "content",
      type: "string[]",
      required: true,
    },
    {
      name: "auto",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "duration",
      type: "number",
      defaultValue: "3000",
    },
  ],
  examples: [
    {
      kind: "executable",
      title: "Automatic rotation",
      code: `import { TextCarrousel } from "@usefui/components";

export function Component() {
  return (
    <TextCarrousel
      content={[
        "Fast by default",
        "Accessible by design",
        "Made for the web",
      ]}
      duration={3000}
    />
  );
}`,
    },
    {
      kind: "executable",
      title: "Click to advance",
      code: `import { TextCarrousel } from "@usefui/components";

export function Component() {
  return (
    <TextCarrousel
      auto={false}
      content={["First tip", "Second tip", "Third tip"]}
    />
  );
}`,
    },
    {
      kind: "note",
      title: "Click only advances when auto is false",
      description:
        "With the default `auto` the wrapper disables pointer events and advances on `duration`. Set `auto={false}` to make the component clickable; each click moves to the next message and stops at the end by wrapping.",
    },
    {
      kind: "note",
      title: "No live region",
      description:
        "Rotating text is not announced to assistive technology because the component renders a plain span without `aria-live`. Provide an accessible static alternative or announce changes yourself when the content is important.",
    },
    {
      kind: "note",
      title: "Keep messages short",
      description:
        "The wrapper is an inline, centered span with no height reservation. Long or multi-line messages change the layout as they rotate.",
    },
  ],
  a11y: {
    role: "none (plain span)",
    keyboardNav:
      "Not focusable. Manual mode responds to click only, so keyboard users cannot advance it without a wrapper control.",
    ariaAttributes: [
      "None rendered — add aria-live to an ancestor if updates must be announced",
    ],
  },
  relatedComponents: ["Shimmer", "ResponseStream", "Badge"],
  aiHints: {
    useCases: [
      "rotating tips or announcements in a hero",
      "short marketing copy that changes over time",
      "click-through taglines when auto rotation is disabled",
    ],
    avoid: [
      "important content that must be announced or read at the user's pace",
      "long paragraphs or variable-height content",
      "using it as a carousel for images or cards",
      "depending on click navigation without a keyboard-accessible control",
    ],
    composesWith: ["Shimmer", "ResponseStream"],
  },
};
