import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ToolbarMeta: ComponentRegistryMetadata = {
  name: "Toolbar",
  description:
    "Collapsible set of tools or actions with controlled/uncontrolled open state, a global Ctrl/Cmd+B shortcut, and side docking.",
  category: "navigation",
  variants: [],
  title: "Toolbar",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "height",
      type: '"fullscreen" | "display" | "auto"',
      defaultValue: "fullscreen",
    },
    {
      name: "side",
      type: '"top" | "right" | "bottom" | "left"',
      defaultValue: "left",
    },
    {
      name: "breakOnMobile",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "breakpoint",
      type: "number",
      defaultValue: "768",
    },
    {
      name: "raw",
      type: "boolean",
    },
  ],
  parts: {
    Root: {
      description:
        "Contains the Toolbar component provider. Accepts controlled or uncontrolled open state.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "open",
          type: "boolean",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
        },
        {
          name: "keyboardShortcut",
          type: "boolean",
          defaultValue: "true",
        },
        {
          name: "breakOnMobile",
          type: "boolean",
          defaultValue: "true",
        },
        {
          name: "breakpoint",
          type: "number",
          defaultValue: "768",
        },
      ],
    },
    Trigger: {
      description:
        "Toolbar.Trigger is used to trigger the expansion and collapse of the associated Toolbar component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
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
        {
          name: "variant",
          type: "primary | secondary | tertiary | mono | border | ghost",
          defaultValue: "ghost",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "small",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "rawicon",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
    Content: {
      description:
        "Toolbar.Content wraps the collapsible body of the Toolbar and is hidden when collapsed.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Section: {
      description:
        "Toolbar.Section groups items inside the Toolbar content area.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "alwaysVisible",
          type: "boolean",
        },
      ],
    },
    Item: {
      description:
        "Toolbar.Item wraps a single tool or action inside a Toolbar.Section.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "showFirstChild",
          type: "boolean",
        },
      ],
    },
  },
  usage: [
    `import { Toolbar, Avatar } from "@usefui/components";
import { Icon, PixelIcon } from "@usefui/icons";

export function ToolbarComponent() {
    return (
        <div className="w-100 h-100" style={{ position: "relative" }}>
            <Toolbar.Root>
                <Toolbar side="left" height="auto">
                <Toolbar.Trigger variant="ghost">
                    <Avatar style={{ background: "var(--font-color-alpha-10)" }}>
                    <Icon fillOpacity={0.3}>
                        <PixelIcon.Downasaur />
                    </Icon>
                    </Avatar>
                </Toolbar.Trigger>
                <Toolbar.Content>
                    <Toolbar.Section
                    alwaysVisible
                    className="flex justify-center w-100 h-100 align-center p-t-large-90 p-b-medium-30"
                    >
                    <Toolbar.Item
                        showFirstChild
                        className="flex align-center w-100 g-medium-30"
                    >
                    <Icon>
                        <Icon.LinkExternal />
                    </Icon>
                    <p className="fs-medium-10 opacity-default-30">Link</p>
                    </Toolbar.Item>
                    </Toolbar.Section>
                </Toolbar.Content>
                </Toolbar>
            </Toolbar.Root>
        </div>
    );

}`,
  ],
  anatomy: `import { Toolbar } from "@usefui/components";

export function ToolbarComponent() {
    return (
        <Toolbar.Root>
            <Toolbar>
                <Toolbar.Trigger>Toggle</Toolbar.Trigger>
                <Toolbar.Content>
                    <Toolbar.Section>
                        <Toolbar.Item>Item</Toolbar.Item>
                    </Toolbar.Section>
                </Toolbar.Content>
            </Toolbar>
        </Toolbar.Root>
    );

}`,

  examples: [
    {
      kind: "note",
      title: "Toolbar.Root > Toolbar > Trigger + Content + Section + Item",
    },
    { kind: "note", title: "side and height fullscreen or auto" },
    {
      kind: "note",
      title: "Ctrl/Cmd+B toggles the toolbar globally",
    },
    {
      kind: "note",
      title: "alwaysVisible on Section; showFirstChild on Item",
    },
    {
      kind: "note",
      title:
        "breakOnMobile + breakpoint switch to mobile behavior; keyboardShortcut disables Ctrl/Cmd+B",
    },
    {
      kind: "note",
      title: "controlled open via Toolbar.Root open/onOpenChange",
    },
  ],
  a11y: {
    role: "toolbar on container",
    keyboardNav:
      "Ctrl/Cmd+B toggles globally; Trigger toggles on click; Enter/Space via Button semantics",
    ariaAttributes: [
      "aria-label",
      "aria-controls",
      "aria-expanded",
      "aria-orientation",
    ],
  },
  relatedComponents: ["Button", "Page"],
  aiHints: {
    useCases: [
      "IDE-style collapsible side rails",
      "global shortcut to expand/collapse",
      "sections visible when collapsed via alwaysVisible",
    ],
    avoid: [
      "primary page navigation",
      "expecting collapsed Item children to be keyboard-focusable",
      "custom per-instance shortcuts — the toggle is fixed to Ctrl/Cmd+B",
    ],
    composesWith: [
      "Toolbar.Root",
      "Toolbar.Trigger",
      "Toolbar.Content",
      "Toolbar.Section",
      "Toolbar.Item",
      "Button",
    ],
  },
};
