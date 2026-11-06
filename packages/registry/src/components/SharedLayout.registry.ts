import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const SharedLayoutMeta: ComponentRegistryMetadata = {
  name: "SharedLayout",
  title: "SharedLayout",
  description:
    "A single highlight that glides between items on hover or focus. SharedLayout.Root provides the pill state, and SharedLayout.Item measures itself so the highlight matches its top and height with a smooth move transition. Items can render as divs or as list items when the container is a `ul`.",
  category: "layout",
  variants: [],
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "as",
      type: '"div" | "ul"',
      defaultValue: "div",
    },
    {
      name: "direction",
      type: '"x" | "y"',
      defaultValue: "y",
    },
    {
      name: "inset",
      type: "number",
      defaultValue: "16",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "className",
      type: "string",
    },
  ],
  parts: {
    Root: {
      description:
        "Provides the shared layout context. It renders no DOM element and only accepts children.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Item: {
      description:
        'An element the highlight can move to. Hovering or focusing any focusable descendant activates it. Renders a `div`, or an `li` when the container uses `as="ul"`.',
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "onMouseEnter",
          type: "(event: MouseEvent<HTMLElement>) => void",
        },
        {
          name: "onFocus",
          type: "(event: FocusEvent<HTMLElement>) => void",
        },
        {
          name: "className",
          type: "string",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Navigation list with a shared highlight",
      code: `import { SharedLayout, Button } from "@usefui/components";

export function Component() {
  return (
    <SharedLayout.Root>
      <SharedLayout inset={12} className="flex flex-column">
        <SharedLayout.Item>
          <Button variant="ghost">Overview</Button>
        </SharedLayout.Item>
        <SharedLayout.Item>
          <Button variant="ghost">Activity</Button>
        </SharedLayout.Item>
        <SharedLayout.Item>
          <Button variant="ghost">Settings</Button>
        </SharedLayout.Item>
      </SharedLayout>
    </SharedLayout.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Semantic list container",
      code: `import { SharedLayout, Button } from "@usefui/components";

export function Component() {
  return (
    <SharedLayout.Root>
      <SharedLayout as="ul" inset={8}>
        <SharedLayout.Item>
          <Button variant="ghost">Inbox</Button>
        </SharedLayout.Item>
        <SharedLayout.Item>
          <Button variant="ghost">Archive</Button>
        </SharedLayout.Item>
      </SharedLayout>
    </SharedLayout.Root>
  );
}`,
    },
    {
      kind: "note",
      title: "The highlight is decorative",
      description:
        'The pill element is rendered with `aria-hidden="true"`; it mirrors the active item and is not announced.',
    },
    {
      kind: "note",
      title: "Focus bubbles to the item",
      description:
        "Focus events bubble in React, so focusing a Button inside SharedLayout.Item brings the highlight to that item for keyboard users too. Hovering off keeps the pill on a still-focused item.",
    },
    {
      kind: "note",
      title: '`as="ul"` changes the item element',
      description:
        'Pass `as="ul"` when the items represent a list. The container becomes a `ul` and each Item renders as an `li`, preserving list semantics.',
    },
  ],
  a11y: {
    role: 'none on the wrapper; semantic `ul`/`li` when `as="ul"`',
    keyboardNav:
      "The moving highlight follows focus, so tabbing through the interactive children moves it. Items themselves are not focusable.",
    ariaAttributes: [
      'aria-hidden="true" on the highlight pill',
      'semantic ul/li elements when as="ul"',
    ],
  },
  relatedComponents: ["ContextMenu", "DropdownMenu", "Tabs", "Button", "Page"],
  aiHints: {
    useCases: [
      "side navigation with a sliding active background",
      "menus and command lists with a hover highlight",
      "tab-like rows where focus should move the highlight",
    ],
    avoid: [
      "items without a focusable child when keyboard support matters",
      "using SharedLayout.Item outside SharedLayout.Root",
      "long content rows where a single-height pill no longer fits",
    ],
    composesWith: [
      "SharedLayout.Root",
      "SharedLayout.Item",
      "Button",
      "ContextMenu",
      "Tabs",
    ],
  },
};
