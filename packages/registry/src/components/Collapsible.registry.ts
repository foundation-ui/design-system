import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const CollapsibleMeta: ComponentRegistryMetadata = {
  name: "Collapsible",
  description:
    "Single expandable region driven by a trigger. Independent toggle per Root instance.",
  category: "layout",
  variants: [ComponentVariantEnum.Ghost],
  title: "Collapsible",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "defaultOpen",
      type: "boolean",
    },
    {
      name: "showFirstChild",
      type: "boolean",
    },
  ],
  parts: {
    Root: {
      description: "Contains the Collapsible component provider.",
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
        "Collapsible.Trigger is used to triggers the expansion and collapse of the associated Collapsible.Content component.",
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
        "Collapsible.Content is used to contains the content of the associated Collapsible.Trigger component.",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
        {
          name: "defaultOpen",
          type: "boolean",
        },
        {
          name: "showFirstChild",
          type: "boolean",
        },
      ],
    },
  },
  usage: [
    `import React from "react";
import { Collapsible, Divider } from "@usefui/components";

    function CollapsibleTemplate() {
        return (
            <Collapsible.Root>
                <Collapsible className="grid g-medium-30 p-t-large-30 p-x-medium-60">
                    <Collapsible.Trigger>@usefui</Collapsible.Trigger>
                    <Divider />
                    <Collapsible.Content showFirstChild>
                        <Collapsible.Trigger>Components</Collapsible.Trigger>
                        <Collapsible.Trigger>Tokens</Collapsible.Trigger>
                        <Collapsible.Trigger>Core</Collapsible.Trigger>
                        <Collapsible.Trigger>Styles</Collapsible.Trigger>
                        <Collapsible.Trigger>Hooks</Collapsible.Trigger>
                        <Collapsible.Trigger>Icons</Collapsible.Trigger>
                        <Collapsible.Trigger>Analytics</Collapsible.Trigger>
                    </Collapsible.Content>
                </Collapsible>
            </Collapsible.Root>
        );

}

export default CollapsibleTemplate;`,
  ],
  anatomy: `import { Collapsible } from "@usefui/components";

export function CollapsibleComponent() {
    return (
    <Collapsible.Root>
      <Collapsible>
        <Collapsible.Trigger>Section</Collapsible.Trigger>
        <Collapsible.Content>Panel content</Collapsible.Content>
      </Collapsible>
    </Collapsible.Root>
    );
}`,

  examples: [
    {
      kind: "note",
      title: "Collapsible.Root > Collapsible > Trigger + Content",
    },
    { kind: "note", title: "DefaultOpen on Content for initial expansion" },
    { kind: "note", title: "ShowFirstChild teaser when collapsed" },
    { kind: "note", title: "Group story: separate Root per collapsible" },
    { kind: "note", title: "ghost trigger via Button props" },
  ],
  a11y: {
    role: "region on Content; Button trigger",
    keyboardNav: "Enter and Space on trigger",
    ariaAttributes: ["aria-controls", "data-expanded", "data-state"],
  },
  relatedComponents: ["Button", "Accordion", "Page"],
  aiHints: {
    useCases: [
      "FAQ or optional advanced settings",
      "single-section disclosure",
      "teaser line with showFirstChild",
    ],
    avoid: [
      "one-open-at-a-time multi-panel — use Accordion",
      "critical-only content without clear trigger label",
      "deep nesting without focus management",
    ],
    composesWith: [
      "Collapsible.Root",
      "Collapsible.Trigger",
      "Collapsible.Content",
      "Button",
    ],
  },
};
