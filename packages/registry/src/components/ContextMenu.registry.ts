import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ContextMenuMeta: ComponentRegistryMetadata = {
  name: "ContextMenu",
  title: "ContextMenu",
  description:
    "Right-click menu anchored to the invocation point. The ContextMenu wrapper owns controlled or uncontrolled open state and dismisses on outside press, scroll, and resize. ContextMenu.Area opens on right-click, touch or pen long-press, and the ContextMenu key or Shift+F10; ContextMenu.Content is clamped to the viewport and morphs open from the click point.",
  category: "navigation",
  variants: ["body", "contrast"],
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
  ],
  parts: {
    Root: {
      description:
        "Provides the context shared by all ContextMenu compounds. It renders no DOM element.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Area: {
      description:
        'Region that opens the menu. Defaults to tabIndex 0 so keyboard users can focus it, and exposes aria-haspopup="menu" and aria-expanded.',
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "onContextMenu",
          type: "(event: MouseEvent<HTMLDivElement>) => void",
        },
        {
          name: "tabIndex",
          type: "number",
          defaultValue: "0",
        },
      ],
    },
    Content: {
      description:
        "Menu surface rendered at the invocation point, clamped to the viewport. Escape closes it and returns focus to the Area; Tab closes it. Keep it mounted so the close transition can play.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "variant",
          type: '"body" | "contrast"',
          defaultValue: "body",
        },
        {
          name: "shape",
          type: '"square" | "smooth" | "round"',
          defaultValue: "smooth",
        },
        {
          name: "aria-label",
          type: "string",
          defaultValue: "Context menu",
        },
        {
          name: "onKeyDown",
          type: "(event: KeyboardEvent<HTMLDivElement>) => void",
        },
      ],
    },
    Item: {
      description:
        "Menu item rendered inside a shared-layout highlight. Activates on click, Enter, or Space and closes the menu unless `radio` is set.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
        {
          name: "radio",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>) => void",
        },
        {
          name: "onKeyDown",
          type: "(event: KeyboardEvent<HTMLLIElement>) => void",
        },
      ],
    },
  },
  examples: [
    {
      kind: "executable",
      title: "Right-click area with menu items",
      code: `import { ContextMenu } from "@usefui/components";

export function Component() {
  return (
    <ContextMenu.Root>
      <ContextMenu onOpenChange={(open) => console.log(open)}>
        <ContextMenu.Area>
          <p>Right click anywhere in this area.</p>
        </ContextMenu.Area>

        <ContextMenu.Content>
          <ContextMenu.Item onClick={() => console.log("copy")}>Copy</ContextMenu.Item>
          <ContextMenu.Item disabled>Archive</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </ContextMenu.Root>
  );
}`,
    },
    {
      kind: "executable",
      title: "Controlled open state",
      code: `import { useState } from "react";
import { ContextMenu } from "@usefui/components";

export function Component() {
  const [open, setOpen] = useState(false);

  return (
    <ContextMenu.Root>
      <ContextMenu open={open} onOpenChange={setOpen}>
        <ContextMenu.Area>Right click here</ContextMenu.Area>
        <ContextMenu.Content aria-label="Row actions">
          <ContextMenu.Item radio>Pin</ContextMenu.Item>
          <ContextMenu.Item radio>Unpin</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </ContextMenu.Root>
  );
}`,
    },
    {
      kind: "note",
      title: "Dismissal is automatic",
      description:
        "The wrapper closes on an outside pointerdown, on window resize, and on scroll anywhere outside the menu. A 100ms open guard prevents touch long-press from immediately dismissing the menu.",
    },
    {
      kind: "note",
      title: "radio keeps the menu open",
      description:
        "Use `radio` for single-choice items that should not dismiss the menu after activation. The state itself is not managed by the component.",
    },
    {
      kind: "note",
      title: 'aria-label defaults to "Context menu"',
      description:
        "Pass a more specific label when several menus can appear on the same page.",
    },
  ],
  a11y: {
    role: "menu on Content; menuitem on Item",
    keyboardNav:
      "ContextMenu key or Shift+F10 opens the menu from the Area. Escape closes it and returns focus to the Area. Tab closes it. Enter and Space activate Items.",
    ariaAttributes: [
      'aria-haspopup="menu" (Area)',
      "aria-expanded (Area)",
      "aria-controls (Area → Content id)",
      'aria-label (Content, defaults to "Context menu")',
      "aria-disabled (Item)",
      "inert and aria-hidden while closed",
    ],
  },
  relatedComponents: [
    "SharedLayout",
    "Dropdown",
    "Tooltip",
    "Button",
    "Divider",
  ],
  aiHints: {
    useCases: [
      "right-click actions on table rows or canvas objects",
      "touch long-press menus that mirror desktop context actions",
      "keyboard-reachable contextual actions from a focusable region",
    ],
    avoid: [
      "primary navigation that should always be visible",
      "menus with many items — use a dropdown or dialog instead",
      "placing the Content outside ContextMenu.Root or ContextMenu",
      "assuming Item manages radio state — it only prevents dismissal",
    ],
    composesWith: [
      "ContextMenu.Root",
      "ContextMenu.Area",
      "ContextMenu.Content",
      "ContextMenu.Item",
      "SharedLayout",
      "Divider",
    ],
  },
};
