import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const MorphingBoxMeta: ComponentRegistryMetadata = {
  name: "MorphingBox",
  title: "MorphingBox",
  description:
    "Dialog surface that morphs between a collapsed 0×0 state and its intrinsic content size, fading its children in after the expansion. It supports four edge anchors and four corner anchors, an in-box close control, an optional overlay, and scroll locking.",
  category: "layout",
  variants: [],
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "open",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "lock",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "direction",
      type: '"top-left-bottom-center" | "top-bottom" | "top-right-bottom-center" | "right-left" | "bottom-right-top-center" | "bottom-top" | "bottom-left-top-center" | "left-right"',
      defaultValue: "bottom-top",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "scrollbar",
      type: "boolean",
    },
  ],
  parts: {
    Root: {
      description:
        "Provides the morphing box context. It renders no DOM element and only accepts children.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Trigger: {
      description:
        "Fixed-position wrapper around a Button that toggles the box. Renders a Button internally, so Button props are forwarded.",
      props: [
        {
          name: "position",
          type: '"top" | "top-left" | "top-right" | "right" | "bottom" | "bottom-left" | "bottom-right" | "left"',
          defaultValue: "bottom-right",
        },
        {
          name: "threshold",
          type: "number",
          defaultValue: "24",
        },
        {
          name: "gap",
          type: "number",
        },
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint" | "link" | "accent"',
          defaultValue: "primary",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "shape",
          type: '"square" | "smooth" | "round"',
          defaultValue: "smooth",
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
      ],
    },
    Control: {
      description:
        "Button rendered inside the box that closes it. Accepts Button props and wires `aria-controls` and `aria-expanded` to the box.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost" | "danger" | "warning" | "success" | "meta" | "hint" | "link" | "accent"',
          defaultValue: "primary",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "shape",
          type: '"square" | "smooth" | "round"',
          defaultValue: "smooth",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
        },
      ],
    },
    Overlay: {
      description:
        "Backdrop rendered behind the box. Set `closeOnInteract` to close the box when the backdrop is clicked.",
      props: [
        {
          name: "closeOnInteract",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "visible",
          type: "boolean",
        },
        {
          name: "canvas",
          type: "boolean",
        },
        {
          name: "particlesColor",
          type: "string",
        },
        {
          name: "shape",
          type: '"circle" | "triangle" | "square" | "diamond"',
          defaultValue: "square",
        },
        {
          name: "background",
          type: '"noise" | "blur"',
          defaultValue: "noise",
        },
        {
          name: "variant",
          type: '"analysis" | "connect" | "think" | "intense" | "ripple" | "converge" | "sweep-x" | "sweep-y" | "diagonal" | "corner"',
          defaultValue: "analysis",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLDivElement>) => void",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Corner-anchored box with an in-box control",
      code: `import { MorphingBox } from "@usefui/components";

export function Component() {
  return (
    <MorphingBox.Root>
      <MorphingBox.Trigger position="bottom-right" gap={24}>
        Open
      </MorphingBox.Trigger>

      <MorphingBox direction="bottom-right-top-center" sizing="small">
        <div className="flex flex-column g-medium-30">
          <p>Morphing panel content.</p>
          <MorphingBox.Control variant="ghost" sizing="small">
            Close
          </MorphingBox.Control>
        </div>
      </MorphingBox>
    </MorphingBox.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Overlay dismissal",
      code: `import { MorphingBox } from "@usefui/components";

export function Component() {
  return (
    <MorphingBox.Root>
      <MorphingBox.Trigger position="top" />
      <MorphingBox.Overlay closeOnInteract />
      <MorphingBox direction="top-bottom" sizing="medium">
        <p>Morphing panel content.</p>
        <MorphingBox.Control>Hide</MorphingBox.Control>
      </MorphingBox>
    </MorphingBox.Root>
  );
}`,
    },
    {
      kind: "note",
      title: "Triggers wrap their own Button",
      description:
        "MorphingBox.Trigger renders a fixed-position wrapper around a Button rather than styling the wrapper as a Button. Pass Button props (`variant`, `sizing`, `shape`, `disabled`) directly to the Trigger and they reach the inner Button.",
    },
    {
      kind: "note",
      title: "Corner directions describe the anchor pair",
      description:
        "Names such as `bottom-right-top-center` place the box at the bottom-right corner while centering the morph origin toward the top. Edge names such as `top-bottom` center the box on the cross axis.",
    },
    {
      kind: "note",
      title: "`open` is a one-way native dialog trigger",
      description:
        "Like Drawer, the `open` prop toggles the box when it becomes true but does not close it when it returns to false. Use the Trigger, Control, Overlay, or an external handler instead.",
    },
  ],
  a11y: {
    role: "dialog on the box (rendered by the native dialog element)",
    keyboardNav:
      "Trigger and Control render Buttons and support Enter and Space. The box has no Escape handler; add one when keyboard dismissal is required.",
    ariaAttributes: [
      'role="dialog" on the box',
      "aria-labelledby pointing at the trigger",
      "aria-controls on Trigger and Control",
      "aria-expanded on Trigger and Control",
    ],
  },
  relatedComponents: ["Drawer", "Dialog", "Sheet", "Overlay", "Button"],
  aiHints: {
    useCases: [
      "compact contextual panels that expand from a corner",
      "floating help or command surfaces",
      "anchored panels whose content height should define the open size",
    ],
    avoid: [
      "treating `open` as a two-way controlled prop",
      "large full-screen content — use a Drawer or Dialog",
      "forms with many fields inside a small box",
    ],
    composesWith: [
      "MorphingBox.Root",
      "MorphingBox.Trigger",
      "MorphingBox.Control",
      "MorphingBox.Overlay",
      "Button",
    ],
  },
};
