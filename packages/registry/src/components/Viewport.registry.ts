import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ViewportMeta: ComponentRegistryMetadata = {
  name: "Viewport",
  title: "Viewport",
  description:
    "Fixed-height container with optional x, y, or two-axis overflow that can be scrolled by dragging with the pointer. Touch input keeps native scrolling, a 4px threshold separates a press from a drag, and the click that follows a drag is suppressed so inner links and buttons do not fire.",
  category: "layout",
  variants: [],
  props: [
    {
      name: "height",
      type: "number",
      required: true,
    },
    {
      name: "direction",
      type: '"x" | "y" | "both"',
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
      title: "Horizontal drag strip",
      code: `import { Viewport } from "@usefui/components";

export function Component() {
  return (
    <Viewport height={96} direction="x">
      <div className="flex g-medium-30" style={{ width: "max-content" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="p-medium-30 border">{i + 1}</div>
        ))}
      </div>
    </Viewport>
  );
}`,
    },
    {
      kind: "executable",
      title: "Two-axis canvas",
      code: `import { Viewport } from "@usefui/components";

export function Component() {
  return (
    <Viewport height={320} direction="both">
      <div style={{ width: 1200, height: 900 }}>
        Drag to pan in both directions.
      </div>
    </Viewport>
  );
}`,
    },
    {
      kind: "note",
      title: "Omitting direction hides overflow and disables drag",
      description:
        "Without `direction`, both axes resolve to `overflow: hidden` and the drag handlers return early. Always set `x`, `y`, or `both` when the content can overflow.",
    },
    {
      kind: "note",
      title: "Touch keeps native scrolling",
      description:
        'Pointer events with `pointerType === "touch"` are ignored by the drag handlers so momentum scrolling and `touch-action` continue to work. Drag-to-scroll is for mouse and pen input.',
    },
    {
      kind: "note",
      title: "Drags swallow the following click",
      description:
        "Once movement crosses the 4px threshold, pointer capture starts, the container gets a grabbing state, and the click event after release is prevented and stopped so nested controls are not activated.",
    },
    {
      kind: "note",
      title: "forwardRef is supported",
      description:
        "Viewport forwards its ref to the scroll element, which is useful for measuring or programmatically setting `scrollTop` and `scrollLeft`.",
    },
  ],
  a11y: {
    role: "generic scroll container",
    keyboardNav:
      "Mouse, wheel, and native touch scrolling work. The container is not focusable by default, so keyboard users cannot scroll it with arrow keys unless focusable content inside or an added tabIndex provides access.",
    ariaAttributes: [
      "None rendered — add aria-label and tabIndex when the region needs a keyboard entry point",
    ],
  },
  relatedComponents: ["ScrollArea", "Prompt", "Whiteboard", "Page"],
  aiHints: {
    useCases: [
      "horizontal chip or card rails",
      "drag-to-pan canvases and boards",
      "fixed-height regions with x/y scrolling",
    ],
    avoid: [
      "replacing page-level scrolling",
      "touch-only expectations for drag-to-scroll",
      "forgetting `direction` and expecting overflow to scroll",
      "draggable content without separating drag handles from click targets",
    ],
    composesWith: ["ScrollArea", "Prompt.Auxiliary", "Whiteboard", "Page"],
  },
};
