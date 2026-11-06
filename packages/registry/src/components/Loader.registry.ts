import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const LoaderMeta: ComponentRegistryMetadata = {
  name: "Loader",
  title: "Loader",
  description:
    'A family of indeterminate loading indicators. Loader itself is a pass-through composition wrapper; the exported compounds cover a rotating spinner, a Bayer-matrix dither grid, and five ASCII frame animations. Every compound renders with role="status" and sizes through the shared small | medium | large scale.',
  category: "feedback",
  variants: [],
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  parts: {
    Spinner: {
      description:
        "Rotating ring spinner. `circle` draws an open border ring; `circle-filled` adds a translucent track.",
      props: [
        {
          name: "variant",
          type: '"circle" | "circle-filled"',
          defaultValue: "circle",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
      ],
    },
    Dither: {
      description:
        "4×4 grid of cells that pulse in a Bayer-matrix order. Extra div props are forwarded to the grid container.",
      props: [
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
      ],
    },
    ASCII: {
      description:
        "Braille dot spinner (⠋ ⠙ ⠹ …). Steps through 10 frames at `duration` milliseconds per frame.",
      props: [
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "duration",
          type: "number",
          defaultValue: "120",
        },
      ],
    },
    ASCIIBraille: {
      description:
        "Braille block spinner (⣾ ⣽ ⣻ …). Steps through 8 frames at `duration` milliseconds per frame.",
      props: [
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "duration",
          type: "number",
          defaultValue: "120",
        },
      ],
    },
    ASCIILine: {
      description:
        "Classic rotating line (| / - \\). Steps through 4 frames at `duration` milliseconds per frame.",
      props: [
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "duration",
          type: "number",
          defaultValue: "120",
        },
      ],
    },
    ASCIIBounce: {
      description:
        "Single-dot bounce cycle. Steps through 8 frames at `duration` milliseconds per frame.",
      props: [
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "duration",
          type: "number",
          defaultValue: "120",
        },
      ],
    },
    ASCIIBlocks: {
      description:
        "Ascending and descending block bars. Steps through 14 frames at `duration` milliseconds per frame.",
      props: [
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "duration",
          type: "number",
          defaultValue: "120",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Spinner and dither",
      code: `import { Loader } from "@usefui/components";

export function Component() {
  return (
    <div className="flex align-center g-medium-30">
      <Loader.Spinner variant="circle" sizing="small" />
      <Loader.Spinner variant="circle-filled" sizing="medium" />
      <Loader.Dither sizing="large" />
    </div>
  );
}`,
    },
    {
      kind: "executable",
      title: "ASCII animation family",
      code: `import { Loader } from "@usefui/components";

export function Component() {
  return (
    <div className="flex align-center g-medium-30">
      <Loader.ASCII sizing="medium" duration={100} />
      <Loader.ASCIIBraille sizing="medium" duration={100} />
      <Loader.ASCIILine sizing="medium" duration={100} />
      <Loader.ASCIIBounce sizing="medium" duration={100} />
      <Loader.ASCIIBlocks sizing="medium" duration={100} />
    </div>
  );
}`,
    },
    {
      kind: "note",
      title: "Duration applies to every ASCII effect",
      description:
        "All five ASCII compounds accept `duration` (milliseconds per frame, default 120) and restart their interval when it changes. `Loader.ASCIILine` is the canonical name; the earlier `ASCIILaine` spelling was corrected.",
    },
    {
      kind: "note",
      title: "No built-in reduced-motion handling",
      description:
        "Spinner and Dither animate through CSS keyframes, and the ASCII effects advance through a JavaScript interval. None of them check `prefers-reduced-motion`, so provide a static alternative or pause rendering when motion reduction is required.",
    },
    {
      kind: "note",
      title: "Loader itself renders nothing",
      description:
        "The base Loader returns its children unchanged. Use it only as a namespace; render one of the compounds for a visible indicator.",
    },
  ],
  a11y: {
    role: "status on every visible compound",
    keyboardNav: "Not focusable and not interactive.",
    ariaAttributes: [
      'role="status"',
      "aria-label (recommended — the indicators contain no text alternative beyond the ASCII glyph)",
    ],
  },
  relatedComponents: ["Skeleton", "Shimmer", "ProgressBar", "Button"],
  aiHints: {
    useCases: [
      "indeterminate loading in buttons, panels, and inline status rows",
      "decorative terminal or retro ASCII loading states",
      "compact dither activity indicators",
    ],
    avoid: [
      "determinate progress — use ProgressBar instead",
      "long-running states without a text label or aria-label",
      "relying on the base Loader export to render a visible indicator",
      "motion-sensitive contexts without a static fallback",
    ],
    composesWith: [
      "Loader.Spinner",
      "Loader.Dither",
      "Loader.ASCII",
      "Loader.ASCIIBraille",
      "Loader.ASCIILine",
      "Loader.ASCIIBounce",
      "Loader.ASCIIBlocks",
    ],
  },
};
