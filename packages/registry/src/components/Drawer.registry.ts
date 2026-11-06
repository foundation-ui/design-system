import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const DrawerMeta: ComponentRegistryMetadata = {
  name: "Drawer",
  title: "Drawer",
  description:
    "Sliding dialog panel anchored to a viewport edge. Drawer.Root provides the open state, Drawer.Trigger is an edge handle that toggles the panel and can also be swiped, and Drawer.Control is an in-panel close button. The panel mounts on open, animates out before unmounting, and locks page scroll while open.",
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
      type: '"top-bottom" | "right-left" | "bottom-top" | "left-right"',
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
        "Provides the drawer context. It renders no DOM element and only accepts children.",
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
        "Fixed edge handle that toggles the drawer. Renders a Button, accepts Button props, and supports pointer drag in the direction opposite to `position`.",
      props: [
        {
          name: "position",
          type: '"top" | "right" | "bottom" | "left"',
          defaultValue: "bottom",
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
        "Button rendered inside the drawer that closes it. Accepts Button props and wires `aria-controls` and `aria-expanded` to the drawer.",
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
    Menu: {
      description:
        "Semantic `menu` element for the drawer header. Styled as a flex row by default; accepts dialog props.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
    Overlay: {
      description:
        "Backdrop rendered behind the drawer. Set `closeOnInteract` to close the drawer when the backdrop is clicked.",
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
      title: "Edge trigger, menu header, and close control",
      code: `import { Drawer } from "@usefui/components";

export function Component() {
  return (
    <Drawer.Root>
      <Drawer.Trigger position="bottom" gap={16} />

      <Drawer direction="bottom-top" sizing="medium">
        <Drawer.Menu className="flex align-center justify-between">
          <span>Details</span>
          <Drawer.Control variant="ghost" sizing="small">
            Close
          </Drawer.Control>
        </Drawer.Menu>
        <p>Drawer content.</p>
      </Drawer>
    </Drawer.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Backdrop dismissal",
      code: `import { Drawer } from "@usefui/components";

export function Component() {
  return (
    <Drawer.Root>
      <Drawer.Trigger position="right" />
      <Drawer.Overlay closeOnInteract />
      <Drawer direction="right-left" sizing="small" lock>
        <Drawer.Menu>
          <Drawer.Control>Hide</Drawer.Control>
        </Drawer.Menu>
        <p>Right drawer content.</p>
      </Drawer>
    </Drawer.Root>
  );
}`,
    },
    {
      kind: "note",
      title: "`open` is a one-way native dialog trigger",
      description:
        "The `open` prop is forwarded to the native dialog element and toggles the drawer when it becomes true. Setting it back to false does not close the drawer; use Drawer.Trigger, Drawer.Control, or a controlled state around the trigger instead.",
    },
    {
      kind: "note",
      title: "The panel unmounts only after its exit animation",
      description:
        "Drawer keeps the dialog mounted while closing and removes it on animationend. Render Drawer as a direct child of Drawer.Root so the context is available.",
    },
    {
      kind: "note",
      title: "Trigger drag direction",
      description:
        "A pointer drag longer than `threshold` along the axis opposite `position` toggles the drawer, and the click that follows is suppressed. `position` only controls where the handle sits; `direction` controls where the panel slides from.",
    },
  ],
  a11y: {
    role: "dialog on the panel (rendered by the native dialog element)",
    keyboardNav:
      "Drawer.Trigger and Drawer.Control render Buttons and therefore support Enter and Space. The panel has no Escape handler; add one when the drawer must be dismissible from the keyboard.",
    ariaAttributes: [
      'role="dialog" on the panel',
      "aria-labelledby pointing at the trigger",
      "aria-controls on Trigger and Control",
      "aria-expanded on Trigger and Control",
    ],
  },
  relatedComponents: [
    "MorphingBox",
    "Dialog",
    "Sheet",
    "Overlay",
    "ScrollArea",
  ],
  aiHints: {
    useCases: [
      "side panels for details, filters, or settings",
      "bottom sheets on small screens",
      "swipe-to-open panels from a screen edge",
    ],
    avoid: [
      "treating `open` as a two-way controlled prop",
      "expecting Escape to close the drawer without adding a handler",
      "long forms without a ScrollArea inside the panel",
    ],
    composesWith: [
      "Drawer.Root",
      "Drawer.Trigger",
      "Drawer.Control",
      "Drawer.Menu",
      "Drawer.Overlay",
      "ScrollArea",
      "Button",
    ],
  },
};
