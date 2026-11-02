import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const DropdownMeta: ComponentRegistryMetadata = {
  name: "DropdownMenu",
  description:
    "Expand and collapse a list of actions. Trigger is Button-based; content flips by viewport.",
  category: "navigation",
  variants: ["body", "contrast"],
  title: "Dropdown",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
  ],
  parts: {
    Root: {
      description: "Contains the DropdownMenu component provider.",
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
        "DropdownMenu.Trigger is used to triggers the expansion and collapse of the associated DropdownMenu.Content component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: '"primary" | "secondary" | "tertiary" | "mono" | "border" | "ghost"',
          defaultValue: "ghost",
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
    Content: {
      description:
        "DropdownMenu.Content is used to contains the content of the associated DropdownMenu.Trigger component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "variant",
          type: '"body" | "contrast"',
          defaultValue: "body",
        },
        {
          name: "sizing",
          type: '"small" | "medium" | "large"',
          defaultValue: "medium",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "raw",
          type: "boolean",
          defaultValue: "false",
        },
      ],
    },
    Item: {
      description:
        "DropdownMenu.Item is used associated to DropdownMenu.Content component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
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
import { Divider, DropdownMenu } from "@usefui/components";
import { Icon } from "@usefui/icons";

export function DropdownMenuComponent() {
    return (
        <div className="flex align-center justify-center w-100 h-100 p-t-large-30 p-x-medium-60">
            <DropdownMenu.Root>
                <DropdownMenu>
                    <DropdownMenu.Trigger variant="secondary" sizing="large">
                        @usefui
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content>
                        <DropdownMenu.Item
                        radio
                        className="flex align-center justify-between"
                        >
                        Radio Item
                        <Icon>
                            <Icon.ArrowRight />
                        </Icon>
                        </DropdownMenu.Item>
                        <Divider />
                        <DropdownMenu.Item>Components</DropdownMenu.Item>
                        <DropdownMenu.Item>Tokens</DropdownMenu.Item>
                        <DropdownMenu.Item>Core</DropdownMenu.Item>
                        <DropdownMenu.Item>Styles</DropdownMenu.Item>
                        <DropdownMenu.Item>Hooks</DropdownMenu.Item>
                        <DropdownMenu.Item>Icons</DropdownMenu.Item>
                        <DropdownMenu.Item>Analytics</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu>
            </DropdownMenu.Root>
        </div>
    );

}`,
  ],
  anatomy: `import { DropdownMenu } from "@usefui/components";

export function DropdownMenuComponent() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
            <DropdownMenu>
                <DropdownMenu.Content>
                <DropdownMenu.Item>Action</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu>
        </DropdownMenu.Root>
    );
}`,

  examples: [
    {
      kind: "note",
      title: "DropdownMenu.Root > wrapper > Trigger + Content > Items",
    },
    {
      kind: "note",
      title: "RadioItem story: radio prop keeps menu open on item click",
    },
    { kind: "note", title: "Variants story: content variant body vs contrast" },
    { kind: "note", title: "Badge shortcut hints inside items" },
    { kind: "note", title: "ghost trigger default" },
  ],
  a11y: {
    role: "menu / menuitem on trigger and items",
    keyboardNav:
      "Enter and Space on items; Escape closes; click-outside dismiss",
    ariaAttributes: ["aria-haspopup", "aria-labelledby", "aria-disabled"],
  },
  relatedComponents: ["Button", "Badge", "Divider", "Page"],
  aiHints: {
    useCases: [
      "row or context action menus",
      "icon button menus with shortcuts",
      "contrast panel on dark backgrounds",
    ],
    avoid: [
      "primary app navigation",
      "single-choice forms — use Select",
      "long lists without grouping",
    ],
    composesWith: [
      "DropdownMenu.Root",
      "DropdownMenu.Trigger",
      "DropdownMenu.Content",
      "DropdownMenu.Item",
      "Button",
      "Badge",
    ],
  },
};
