import {
  ComponentVariantEnum,
  ComponentRegistryMetadata,
} from "@chambellan/contracts";

export const AccordionMeta: ComponentRegistryMetadata = {
  name: "Accordion",
  description:
    "Expand and collapse sections of content. Compound API with one open panel per Root; Trigger and Content are linked by a shared value.",
  category: "layout",
  variants: [
    ComponentVariantEnum.Ghost,
    ComponentVariantEnum.Primary,
    ComponentVariantEnum.Secondary,
    ComponentVariantEnum.Tertiary,
    ComponentVariantEnum.Mono,
    ComponentVariantEnum.Border,
  ],
  title: "Accordion",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "spacing",
      type: "small | medium | large",
    },
  ],
  parts: {
    Root: {
      description: "Contains the accordion component provider.",
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
        "Accordion.Trigger is used to triggers the expansion and collapse of the associated Accordion.Content component.",
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
        {
          name: "sizing",
          type: "small | medium | large",
          defaultValue: "medium",
        },
        {
          name: "shape",
          type: "square | smooth | round",
          defaultValue: "smooth",
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
        "Accordion.Content is used to contains the content of the associated Accordion.Trigger component.",
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
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
        },
        {
          name: "spacing",
          type: "small | medium | large",
        },
      ],
    },
  },
  usage: [
    `import { Accordion, Divider } from "@usefui/components";
import { Icon } from "@usefui/icons";

export function AccordionComponent() {
    return (
        <Accordion.Root>
          <Accordion
            className="grid g-medium-30 p-t-large-30 p-x-medium-60"
            style={{ maxWidth: "var(--breakpoint-mobile)", margin: "0 auto" }}
          >
            <div className="grid g-medium-30">
              <Accordion.Trigger
                value="info"
                className="w-100 flex justify-between align-center"
              >
                Informations
                <Icon>
                  <Icon.ChevronSelectorVertical />
                </Icon>
              </Accordion.Trigger>
              <Accordion.Content value="info">
                <p className="fs-medium-10">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                  quidem culpa asperiores. Suscipit, iusto consectetur.
                </p>
                <br />
                <i className="fs-medium-10 opacity-default-60">
                  Iure corrupti eos non cupiditate architecto totam fuga suscipit
                  fugiat officiis quasi, aperiam ad debitis.
                </i>
              </Accordion.Content>
            </div>
            <Divider />
            <div className="grid g-medium-30">
              <Accordion.Trigger
                value="feat"
                className="w-100 flex justify-between align-center"
              >
                Features
                <Icon>
                  <Icon.ChevronSelectorVertical />
                </Icon>
              </Accordion.Trigger>
              <Accordion.Content value="feat">
                <p className="fs-medium-10">
                  Iure corrupti eos non cupiditate architecto totam fuga suscipit
                  fugiat officiis quasi, aperiam ad debitis.
                </p>
              </Accordion.Content>
            </div>
            <Divider />
            <div className="grid g-medium-30">
              <Accordion.Trigger
                value="requests"
                className="w-100 flex justify-between align-center"
              >
                Requests
                <Icon>
                  <Icon.ChevronSelectorVertical />
                </Icon>
              </Accordion.Trigger>
              <Accordion.Content value="requests">
                <i className="fs-medium-10 opacity-default-60">
                  Iure corrupti eos non cupiditate architecto totam fuga suscipit
                  fugiat officiis quasi, aperiam ad debitis.
                </i>
              </Accordion.Content>
            </div>
          </Accordion>
        </Accordion.Root>
    );
}`,
  ],
  anatomy: `import { Accordion } from "@usefui/components";

export function AccordionComponent() {
    return (
      <Accordion.Root>
        <Accordion>
          <Accordion.Trigger value="demo">Section</Accordion.Trigger>
          <Accordion.Content value="demo">Panel content</Accordion.Content>
        </Accordion>
      </Accordion.Root>
    );
}`,

  examples: [
    {
      kind: "note",
      title:
        "single section: Accordion.Root > Accordion > Trigger + Content with matching value",
    },
    {
      kind: "note",
      title:
        "collapsed by default (Default story); click trigger to reveal content",
    },
    {
      kind: "note",
      title:
        "initially expanded via Accordion.Content defaultOpen (DefaultOpen story)",
    },
    {
      kind: "note",
      title:
        "multiple independent accordions — one Accordion.Root per section (Group story)",
    },
    {
      kind: "note",
      title:
        "multiple panels in one Root — only one Content visible; switching triggers swaps panels",
    },
    {
      kind: "note",
      title:
        "toggle closed by clicking the active trigger again (applyValue null)",
    },
    {
      kind: "note",
      title:
        "trigger styling via Button props: variant, sizing, shape, raw, rawicon",
    },
  ],
  a11y: {
    role: "Trigger: button; Content: article",
    keyboardNav:
      "Enter and Space on trigger; Tab between triggers; content unmounts when collapsed",
    ariaAttributes: [
      "aria-expanded (trigger and content)",
      "aria-controls (trigger → content id)",
      "aria-labelledby (content → trigger id)",
      "aria-disabled",
      "aria-label",
      "aria-description",
    ],
  },
  relatedComponents: ["Button", "Collapsible", "Tabs", "Page", "ScrollArea"],
  aiHints: {
    useCases: [
      "FAQ or settings sections where only one block should be open at a time",
      "progressive disclosure of dense UI (forms, filters, inspector panels)",
      "stacked emoji or list rows with independent Root per item (Group story)",
    ],
    avoid: [
      "mutually exclusive top-level navigation — use Tabs instead",
      "simple show/hide of a single block without multiple values — use Collapsible",
      "multiple simultaneous open sections in one Root — only one value is tracked",
      "mismatched value between Accordion.Trigger and Accordion.Content",
      "forgetting Accordion.Root — context and ids require the provider",
    ],
    composesWith: [
      "Button (Accordion.Trigger renders Button, default variant ghost)",
      "Page (story layout wrapper)",
    ],
  },
};
