import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const CardMeta: ComponentRegistryMetadata = {
  name: "Card",
  description:
    "Styled layout container for grouped sections with optional header, body, and grid layouts.",
  category: "layout",
  variants: [],
  title: "Card",
  props: [
    {
      name: "shape",
      type: '"round" | "smooth" | "square"',
      defaultValue: "smooth",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  parts: {
    Grid: {
      description: "Contains the Cards component into a grid.",
      props: [
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Body: {
      description:
        "Card.Body is used to contains text content and interaction into a contrasted background.",
      props: [
        {
          name: "shape",
          type: '"round" | "smooth" | "square"',
          defaultValue: "smooth",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Meta: {
      description:
        "Card.Meta is used associated to a Card component to conain additional text.",
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
    `import { Card } from "@usefui/components";

export function CardTemplate() {
    return (
      <Card.Grid>
        <Card>
          <Card.Body className="h-100 p-b-large-10">
            <hgroup className="grid g-medium-30">
              <h6 className="fs-medium-40">Foundation UI</h6>
              <span className="fs-medium-20 flex align-center">
                Free&nbsp;
                <span className="opacity-default-30 fs-medium-10">/month</span>
              </span>
            </hgroup>
            <Button
              sizing="large"
              variant="secondary"
              animation="reflective"
              className="w-100"
            >
              Start building for free
            </Button>
          </Card.Body>
          <Card.Meta>@usefui</Card.Meta>
        </Card>
      </Card.Grid>
    );
}`,
  ],
  anatomy: `import { Card } from "@usefui/components";

export function CardComponent() {
    return (
      <Card.Grid>
<Card>
           <Card.Body>Content</Card.Body>
           <Card.Meta>@usefui</Card.Meta>
         </Card>
      </Card.Grid>
    );
}`,

  examples: [
    {
      kind: "note",
      title: "Card with Card.Meta header, Card.Body content, footer actions",
    },
    {
      kind: "note",
      title: "Card.Grid for responsive card grids with sizing gaps",
    },
    { kind: "note", title: "dashboard metric or summary blocks" },
    { kind: "note", title: "settings panel with primary CTA in body" },
  ],
  a11y: {
    role: "div (no landmark roles)",
    keyboardNav: "Depends on children",
    ariaAttributes: [],
  },
  relatedComponents: ["Button", "Page"],
  aiHints: {
    useCases: [
      "dashboard tiles and summary blocks",
      "grouped form or settings sections",
      "grid of related items via Card.Grid",
    ],
    avoid: [
      "clickable card without button/link semantics",
      "entire page as one card without landmarks",
      "modal content — use Dialog",
    ],
    composesWith: ["Card.Body", "Card.Meta", "Card.Grid", "Button", "Page"],
  },
};
