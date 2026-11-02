import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const DialogMeta: ComponentRegistryMetadata = {
  name: "Dialog",
  description:
    "Modal window on top of the current layer with overlay, scroll lock, and keyboard shortcuts.",
  category: "feedback",
  variants: [],
  title: "Dialog",
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
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "lock",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "raw",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  parts: {
    Root: {
      description: "Contains the Dialog component provider.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
    Menu: {
      description:
        "Dialog.Menu is used to contains the links, controls,.. of a Dialog.",
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
        "Dialog.Trigger is used to toggle the rendering of the associated Dialog component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
          defaultValue: "primary",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
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
    Control: {
      description:
        "Dialog.Control is used to close the associated Dialog component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
          defaultValue: "primary",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
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
    Overlay: {
      description:
        "Dialog.Overlay is used to separate the Dialog layer from the rest of the page content.",
      props: [
        {
          name: "closeOnInteract",
          type: "boolean",
          defaultValue: "false",
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
  usage: [
    `import React from "react";
import { Dialog } from "@usefui/components";

    function DialogTemplate() {
        return (
            <Dialog.Root>

            </Dialog.Root>
        );

}

export default DialogTemplate;`,
  ],
  anatomy: `import { Dialog } from "@usefui/components";

export function DialogComponent() {
    return (
    <Dialog.Root>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog>
        <Dialog.Menu>
          <Dialog.Control>Close</Dialog.Control>
        </Dialog.Menu>
      </Dialog>
      <Dialog.Overlay />
    </Dialog.Root>
    );
}`,

  examples: [
    { kind: "note", title: "Dialog.Root > Trigger + Dialog + Dialog.Overlay" },
    {
      kind: "note",
      title: "Dialog.Menu for top chrome; Dialog.Control for in-dialog actions",
    },
    { kind: "note", title: "DefaultOpen, NoOverlay, Shortcut stories" },
    { kind: "note", title: "command palette pattern with Field and Dropdown" },
    { kind: "note", title: "closeOnInteract on overlay" },
  ],
  a11y: {
    role: "dialog on content surface",
    keyboardNav:
      "hotkey + bindkey when shortcut enabled; Escape via overlay patterns",
    ariaAttributes: [
      "aria-labelledby",
      "aria-controls",
      "aria-expanded",
      "data-state",
    ],
  },
  relatedComponents: [
    "Overlay",
    "ScrollArea",
    "Button",
    "Field",
    "Dropdown",
    "Badge",
    "Divider",
    "Page",
  ],
  aiHints: {
    useCases: [
      "confirm destructive actions",
      "command palette or search modal",
      "keyboard shortcut open via hotkey",
    ],
    avoid: [
      "stacked modals without focus/z-index plan",
      "essential content only in dialog",
      "NoOverlay when backdrop dismiss is required",
    ],
    composesWith: [
      "Dialog.Root",
      "Dialog.Trigger",
      "Dialog.Overlay",
      "Dialog.Menu",
      "Dialog.Control",
      "Overlay",
      "Button",
    ],
  },
};
