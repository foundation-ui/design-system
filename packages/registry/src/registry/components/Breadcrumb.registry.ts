import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const BreadcrumbMeta: ComponentRegistryMetadata = {
  name: "Breadcrumb",
  description:
    "Displays the path to the current resource as a hierarchy of navigable segments.",
  category: "navigation",
  variants: [],
  title: "Breadcrumb",
  props: [
    {
      name: "path",
      type: "string",
      required: true,
    },
    {
      name: "capitalizeItems",
      type: "boolean",
      defaultValue: "true",
    },
    {
      name: "navigate",
      type: "(href: string) => void",
    },
    {
      name: "children",
      type: "ReactNode",
    },
  ],
  parts: {
    Item: {
      description:
        "Breadcrumb.Item are used to display the path to the current resource.",
      props: [
        {
          name: "isLastItem",
          type: "boolean",
        },
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
    Separator: {
      description:
        "Breadcrumb.Separator are used to display hierarchy of links.",
      props: [
        {
          name: "children",
          type: "ReactNode",
        },
      ],
    },
  },
  usage: [
    `import React from "react";
import { Breadcrumb } from "@usefui/components";

function BreadcrumbTemplate() {

    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">
          <Breadcrumb path={"/demo/path/current-path"} >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
        </div>
    );

}

export default BreadcrumbTemplate;`,
  ],
  anatomy: `import { Breadcrumb } from "@usefui/components";

export function BreadcrumbComponent() {
    return (
        <Breadcrumb path="/demo/path/current-path">
           <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
    );
}`,

  examples: [
    {
      kind: "note",
      title: "path prop with slash-separated segments auto-rendered as items",
    },
    { kind: "note", title: "navigate callback for client-side routing" },
    {
      kind: "note",
      title: "leading custom Breadcrumb.Item (e.g. Home) via children",
    },
    { kind: "note", title: "capitalizeItems for slug formatting" },
    { kind: "note", title: "read-only trail when navigate is omitted" },
  ],
  a11y: {
    role: "Button per item (ghost small)",
    keyboardNav: "Tab when navigate provided; items disabled without navigate",
    ariaAttributes: ["data-current on last item wrapper"],
  },
  relatedComponents: ["Button", "Page"],
  aiHints: {
    useCases: [
      "app shell wayfinding from URL path",
      "settings or docs hierarchy",
      "prefixed home segment via children",
    ],
    avoid: [
      "deep paths without overflow handling",
      "expecting clicks without navigate prop",
      "root-only path (renders null for /)",
    ],
    composesWith: ["Breadcrumb.Item", "Breadcrumb.Separator", "Button", "Page"],
  },
};
