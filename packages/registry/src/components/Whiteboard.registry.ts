import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const WhiteboardMeta: ComponentRegistryMetadata = {
  name: "Whiteboard",
  title: "Whiteboard",
  description:
    "Pannable, zoomable canvas surface. Whiteboard.Root provides the offset and zoom context, Whiteboard drags from the background with the mouse and zooms with Ctrl or Meta + wheel, Whiteboard.Zoom renders in, out, and reset buttons, and Whiteboard.Indicator renders the current zoom percentage.",
  category: "layout",
  variants: [],
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "allowWheelZoom",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "allowDrag",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "step",
      type: "number",
      defaultValue: "0.1",
    },
    {
      name: "min",
      type: "number",
      defaultValue: "0.25",
    },
    {
      name: "max",
      type: "number",
      defaultValue: "3",
    },
  ],
  parts: {
    Root: {
      description:
        "Provides the whiteboard context. It renders no DOM element and only accepts children.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Zoom: {
      description:
        "Button that steps the zoom in, steps it out, or resets zoom and offset. Disabled at the matching limit. Renders a Button, so Button props are forwarded.",
      props: [
        {
          name: "direction",
          type: '"in" | "out" | "reset"',
          required: true,
        },
        {
          name: "initial",
          type: "number",
          defaultValue: "1",
        },
        {
          name: "step",
          type: "number",
          defaultValue: "0.25",
        },
        {
          name: "min",
          type: "number",
          defaultValue: "0.25",
        },
        {
          name: "max",
          type: "number",
          defaultValue: "3",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
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
          name: "onClick",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
        },
      ],
    },
    Indicator: {
      description:
        "Renders the current zoom level as a rounded percentage. It takes no props and renders a fragment, so place it inside your own label.",
      props: [],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Canvas with zoom controls",
      code: `import { Whiteboard } from "@usefui/components";

export function Component() {
  return (
    <div style={{ position: "relative", height: 420 }}>
      <Whiteboard.Root>
        <Whiteboard allowWheelZoom allowDrag step={0.1} min={0.25} max={3}>
          <div className="Whiteboard-background" style={{ width: 1200, height: 900 }}>
            Drag the background to pan. Use Ctrl or Meta + wheel to zoom.
          </div>
        </Whiteboard>

        <div style={{ position: "absolute", right: 16, bottom: 16 }}>
          <Whiteboard.Zoom direction="out" initial={1}>−</Whiteboard.Zoom>
          <span>
            <Whiteboard.Indicator />
          </span>
          <Whiteboard.Zoom direction="in" initial={1}>+</Whiteboard.Zoom>
          <Whiteboard.Zoom direction="reset" initial={1}>Reset</Whiteboard.Zoom>
        </div>
      </Whiteboard.Root>
    </div>
  );
}`,
    },
    {
      kind: "executable",
      title: "Locked viewport with custom zoom limits",
      code: `import { Whiteboard } from "@usefui/components";

export function Component() {
  return (
    <div style={{ position: "relative", height: 320 }}>
      <Whiteboard.Root>
        <Whiteboard allowWheelZoom={false} allowDrag={false} step={0.2} min={0.5} max={2}>
          <div className="Whiteboard-background">Static board.</div>
        </Whiteboard>
        <Whiteboard.Zoom direction="in" step={0.2} min={0.5} max={2} initial={1}>
          Zoom in
        </Whiteboard.Zoom>
      </Whiteboard.Root>
    </div>
  );
}`,
    },
    {
      kind: "note",
      title: "Root and Zoom have different defaults",
      description:
        "The Whiteboard surface defaults to `step=0.1`, `min=0.25`, and `max=3`. Whiteboard.Zoom defaults to `step=0.25`, `min=0.25`, `max=3`, and `initial=1`. Passing limits to each part keeps wheel and button zoom in sync.",
    },
    {
      kind: "note",
      title: "Wheel zoom requires a modifier",
      description:
        "Only Ctrl + wheel and Meta + wheel change the zoom; a plain wheel scrolls. Set `allowWheelZoom={false}` to disable it entirely.",
    },
    {
      kind: "note",
      title: "Drag starts on the background only",
      description:
        "A mousedown begins panning only when the event target is the surface itself or has the `Whiteboard-background` class. Content inside the transformed layer keeps its own pointer interactions.",
    },
    {
      kind: "note",
      title: "Reset clears the offset too",
      description:
        '`direction="reset"` restores the `initial` zoom and sets the board offset back to { x: 0, y: 0 }.',
    },
  ],
  a11y: {
    role: "generic canvas region; zoom controls are Buttons",
    keyboardNav:
      "Zoom and reset controls are Buttons and support Enter and Space. Panning and wheel zoom are pointer-only; provide alternative controls when keyboard users need to move the canvas.",
    ariaAttributes: [
      "aria-label on the canvas region (recommended)",
      "Standard Button semantics on Whiteboard.Zoom",
    ],
  },
  relatedComponents: ["Viewport", "BulkActions", "Page", "Button"],
  aiHints: {
    useCases: [
      "infinite-style boards with pan and zoom",
      "diagram or moodboard surfaces with floating controls",
      "locked previews that still expose zoom buttons",
    ],
    avoid: [
      "expecting touch pan or pinch zoom — only mouse panning and modifier-wheel zoom are implemented",
      "starting a drag from interactive content inside the board",
      "keyboard-only workflows without custom pan controls",
      "very large DOM trees inside the transformed layer without virtualization",
    ],
    composesWith: [
      "Whiteboard.Root",
      "Whiteboard.Zoom",
      "Whiteboard.Indicator",
      "Viewport",
      "BulkActions",
    ],
  },
};
