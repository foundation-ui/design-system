import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ResizableMeta: ComponentRegistryMetadata = {
  name: "Resizable",
  description:
    "Two-panel split layout with draggable divider; widths are percentage-based.",
  category: "layout",
  variants: [],
  title: "Resizable",
  props: [
    {
      name: "defaultWidth",
      type: "number",
      defaultValue: "50",
    },
    {
      name: "minWidth",
      type: "number",
      defaultValue: "30",
    },
    {
      name: "maxWidth",
      type: "number",
      defaultValue: "70",
    },
    {
      name: "left",
      type: "ReactNode",
      required: true,
    },
    {
      name: "right",
      type: "ReactNode",
      required: true,
    },
  ],
  usage: [
    `import { Resizable } from "@usefui/components";

export function ResizableTemplate() {
    return (
      <div className="p-medium-60">
        <Resizable
          left={
            <div
              className="h-100 w-100 flex align-center justify-center"
              style={{ borderRight: "1px solid var(--font-color-alpha-10)" }}
            >
              <p className="fs-medium-20">One</p>
            </div>
          }
          right={
            <div className="h-100 w-100 flex align-center justify-center">
              <p className="fs-medium-20">Two</p>
            </div>
          }
        />
      </div>
    );
}`,
  ],
  anatomy: `import { Resizable } from "@usefui/components";

export function ResizableComponent() {
    return (
      <Resizable left={<div>Left</div>} right={<div>Right</div>} />
    );
}`,

  examples: [
    { kind: "note", title: "left and right panel content nodes" },
    {
      kind: "note",
      title:
        "defaultWidth, minWidth, maxWidth as percentages (default 50, 30–70)",
    },
    { kind: "note", title: "IDE-style editor and preview in Default story" },
  ],
  a11y: {
    role: "drag handle id drag-handle",
    keyboardNav: "Mouse/touch drag only — no keyboard resize",
    ariaAttributes: [],
  },
  relatedComponents: ["Page"],
  aiHints: {
    useCases: [
      "master/detail or editor + preview splits",
      "settings with live preview",
    ],
    avoid: [
      "more than two panels",
      "accessibility-critical resize without keyboard alternative",
      "pixel-exact widths",
    ],
    composesWith: ["Page.Content"],
  },
};
