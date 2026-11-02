import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const TabsMeta: ComponentRegistryMetadata = {
  name: "Tabs",
  description:
    "Switch between tab panels. One active panel per Root; Trigger extends Button props.",
  category: "navigation",
  variants: [ComponentVariantEnum.Ghost],
  title: "Tabs",
  props: [
    {
      name: "value",
      type: "string",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "defaultOpen",
      type: "string",
    },
  ],
  parts: {
    Root: {
      description: "Contains the Tabs component provider.",
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
        "Tabs.Trigger is used to triggers the expansion and collapse of the associated Tabs.Content component.",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
        },
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
      ],
    },
    Content: {
      description:
        "Tabs.Content is used to contains the content of the associated Tabs.Trigger component.",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
        },
      ],
    },
  },
  usage: [
    `import { Tabs, Divider } from "@usefui/components";

export function TabsComponent() {
    return (
      <Tabs.Root>
        <Tabs
          defaultOpen="info"
          className="grid g-medium-30 p-t-large-30 p-x-medium-60"
          style={{ maxWidth: "var(--breakpoint-mobile)", margin: "0 auto" }}
        >
          <div className="flex align-center justify-start g-medium-60">
            <Tabs.Trigger value="info">Informations</Tabs.Trigger>
            <Tabs.Trigger value="features">Features</Tabs.Trigger>
          </div>
          <Divider />
          <div className="flex">
            <Tabs.Content value="info">
              <p className="fs-medium-10 opacity-default-60">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                quidem culpa asperiores. Suscipit, iusto consectetur.
              </p>
            </Tabs.Content>
            <Tabs.Content value="features">
              <p className="fs-medium-10 opacity-default-60">
                Iure corrupti eos non cupiditate architecto totam fuga suscipit
                fugiat officiis quasi, aperiam ad debitis.
              </p>
            </Tabs.Content>
          </div>
        </Tabs>
      </Tabs.Root>
    );
}`,
  ],
  anatomy: `import { Tabs } from "@usefui/components";

export function TabsComponent() {
    return (
      <Tabs.Root>
        <Tabs>
          <Tabs.Trigger value="demo">Tab</Tabs.Trigger>
          <Tabs.Content value="demo">Panel content</Tabs.Content>
        </Tabs>
      </Tabs.Root>
    );
}`,

  examples: [
    {
      kind: "note",
      title: "Tabs.Root > Tabs tablist > Trigger + Content per value",
    },
    { kind: "note", title: "defaultOpen or controlled value" },
    { kind: "note", title: "Default and DefaultOpen stories" },
    { kind: "note", title: "ghost trigger default; Button variant overrides" },
  ],
  a11y: {
    role: "tablist, tab, tabpanel",
    keyboardNav: "Tab between triggers; panel unmounts when inactive",
    ariaAttributes: [
      "aria-selected",
      "aria-labelledby",
      "data-controls",
      "data-state",
    ],
  },
  relatedComponents: ["Button", "Accordion", "Page"],
  aiHints: {
    useCases: [
      "in-page section switching without routing",
      "settings categories",
    ],
    avoid: [
      "primary app routing — use router",
      "accordion-style expand — use Accordion",
      "many tabs on mobile without overflow",
    ],
    composesWith: ["Tabs.Root", "Tabs.Trigger", "Tabs.Content", "Button"],
  },
};
