import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const RulerMeta: ComponentRegistryMetadata = {
  name: "Ruler",
  description:
    "Canvas measurement overlay with draggable horizontal and vertical guides for design-tool style layouts.",
  category: "layout",
  variants: [],
  title: "Ruler",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  parts: {
    Root: {
      description:
        "Ruler.Root provides the Ruler context boundary and must wrap every other Ruler part.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Row: {
      description:
        "Ruler.Row renders a tick strip that adds guides on click and starts drag interactions.",
      props: [
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          required: true,
        },
      ],
    },
    Corner: {
      description: "Ruler.Corner renders the empty corner between both rows.",
      props: [],
    },
    Lines: {
      description:
        "Ruler.Lines renders the draggable guide lines for all registered guides and handles document-level drag events.",
      props: [],
    },
    Canvas: {
      description:
        "Ruler.Canvas wraps the measured content and disables pointer events on its children while a guide is dragged.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
  },
  usage: [
    `import { Page, Ruler } from "@usefui/components";

export function RulerComponent() {
    return (
        <Page>
            <Ruler.Root>
                <Ruler>
                    <Ruler.Corner />
                    <Ruler.Row orientation="horizontal" />
                    <Ruler.Row orientation="vertical" />
                    <Ruler.Canvas>
                        <Ruler.Lines />
                        { /** Your content here **/ }
                    </Ruler.Canvas>
                </Ruler>
            </Ruler.Root>
        </Page>
    );
}`,
  ],
  anatomy: `import { Ruler } from "@usefui/components";

export function RulerComponent() {
    return (
        <Ruler.Root>
            <Ruler>
                <Ruler.Corner />
                <Ruler.Row orientation="horizontal" />
                <Ruler.Row orientation="vertical" />
                <Ruler.Canvas>
                    <Ruler.Lines />
                </Ruler.Canvas>
            </Ruler>
        </Ruler.Root>
    );
}`,
  examples: [
    { kind: "note", title: "Ruler.Root > Ruler > Corner + Rows + Canvas" },
    { kind: "note", title: "click a row to add a guide; drag to move" },
    { kind: "note", title: "double-click a guide to remove it" },
    { kind: "note", title: "compose inside Page for design-tool layouts" },
  ],
  a11y: {
    role: "div (presentational)",
    keyboardNav:
      "Mouse-only interactions (click to add, drag to move, double-click to remove); no keyboard support",
    ariaAttributes: [],
  },
  relatedComponents: ["Page", "Resizable", "Toolbar", "ScrollArea"],
  aiHints: {
    useCases: [
      "design-tool style measurement overlays",
      "layout prototyping canvases",
      "alignment guides over free-form content",
    ],
    avoid: [
      "keyboard-only environments — guides are mouse-only",
      "production end-user UI",
      "using Ruler parts outside Ruler.Root",
    ],
    composesWith: ["Page", "Resizable", "ScrollArea", "Overlay"],
  },
};
