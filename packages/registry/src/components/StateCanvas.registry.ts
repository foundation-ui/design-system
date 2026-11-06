import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const StateCanvasMeta: ComponentRegistryMetadata = {
  name: "StateCanvas",
  title: "StateCanvas",
  description:
    "Canvas particle field for ambient activity and loading states. StateCanvas.Variant renders one of ten animated patterns with configurable shape, color, and speed.",
  category: "feedback",
  variants: [
    "analysis",
    "connect",
    "think",
    "intense",
    "ripple",
    "converge",
    "sweep-x",
    "sweep-y",
    "diagonal",
    "corner",
  ],
  props: [
    {
      name: "children",
      type: "ReactNode",
    },
  ],
  parts: {
    Variant: {
      description:
        "StateCanvas.Variant renders a single animated particle pattern. Children are overlaid in a content layer above the canvas.",
      props: [
        {
          name: "shape",
          type: '"circle" | "triangle" | "square" | "diamond"',
          defaultValue: "circle",
        },
        {
          name: "color",
          type: "string",
          defaultValue: "#ffffff",
        },
        {
          name: "speed",
          type: "number",
          defaultValue: "1",
        },
        {
          name: "variant",
          type: '"analysis" | "connect" | "think" | "intense" | "ripple" | "converge" | "sweep-x" | "sweep-y" | "diagonal" | "corner"',
          defaultValue: "analysis",
        },
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Default analysis field",
      code: `import { StateCanvas } from "@usefui/components";

export function Component() {
  return (
    <StateCanvas>
      <StateCanvas.Variant />
    </StateCanvas>
  );
}`,
    },
    {
      kind: "executable",
      title: "Custom color and variant",
      code: `import { StateCanvas } from "@usefui/components";

export function Component() {
  return (
    <StateCanvas>
      <StateCanvas.Variant variant="ripple" color="#7c9cff" speed={1.4} />
    </StateCanvas>
  );
}`,
    },
    {
      kind: "executable",
      title: "Particles with overlaid content",
      code: `import { StateCanvas } from "@usefui/components";

export function Component() {
  return (
    <StateCanvas>
      <StateCanvas.Variant variant="intense" shape="diamond" color="orange">
        <p className="fs-medium-10">Connecting…</p>
      </StateCanvas.Variant>
    </StateCanvas>
  );
}`,
    },
    {
      kind: "executable",
      title: "Full-bleed overlay backdrop",
      code: `import { Overlay } from "@usefui/components";

export function Component() {
  return (
    <Overlay
      visible
      canvas
      variant="sweep-x"
      shape="square"
      particlesColor="#ffffff30"
      background="noise"
    />
  );
}`,
    },
    {
      kind: "note",
      title: "Variant values",
      description:
        "`analysis`, `connect`, `think`, `intense`, `ripple`, `converge`, `sweep-x`, `sweep-y`, `diagonal`, and `corner` each map to a distinct wave or network animation.",
    },
    {
      kind: "note",
      title: "Color defaults to white",
      description:
        "`color` accepts any CSS color and defaults to `#ffffff`. On light surfaces pass a darker value or a translucent one.",
    },
    {
      kind: "note",
      title: "Changing shape or variant remounts the canvas",
      description:
        "The canvas is keyed on its pattern in common usage; give StateCanvas.Variant a `key` when toggling `shape` or `variant` so the animation restarts cleanly.",
    },
  ],
  a11y: {
    role: "presentational canvas (no semantic role)",
    keyboardNav: "Not interactive; no keyboard behavior.",
    ariaAttributes: [
      "aria-hidden (decorative animation; hide it from assistive technology)",
      "pair with a text status so state is not conveyed by motion alone",
    ],
  },
  relatedComponents: ["Overlay", "Loader", "Shimmer", "Skeleton"],
  aiHints: {
    useCases: [
      "ambient AI thinking or processing indicators",
      "animated modal and overlay backdrops",
      "empty-state or loading surfaces that need motion",
    ],
    avoid: [
      "replacing a determinate ProgressBar for measurable work",
      "conveying status through motion alone — pair it with text",
      "stacking many canvases on one screen — each runs its own animation loop",
      "relying on it for interactive feedback without a text-equivalent",
    ],
    composesWith: ["Overlay", "Loader", "Shimmer", "Button"],
  },
};
