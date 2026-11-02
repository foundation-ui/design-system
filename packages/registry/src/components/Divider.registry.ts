import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const DividerMeta: ComponentRegistryMetadata = {
  name: "Divider",
  description:
    "Horizontal rule separating sections within panels, menus, or dialogs.",
  category: "layout",
  variants: [],
  title: "Divider",
  props: [],
  usage: [
    `import React from "react";
import { Divider } from "@usefui/components";

function DividerTemplate() {

    return (
        <div className="w-100 p-t-large-30 p-x-medium-60">
            <p className="fs-medium-20">@usefui</p>
            <Divider className="m-y-medium-60" />
            <p className="fs-medium-10 opacity-default-60">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos non
                assumenda aliquam similique esse quisquam a, odio praesentium, optio
                sunt architecto itaque fuga et neque repellendus placeat expedita
                maiores voluptatum.
            </p>
        </div>
    );

}

export default DividerTemplate;`,
  ],
  anatomy: `import { Divider } from "@usefui/components";

export function DividerComponent() {
    return <Divider />;
}`,

  examples: [
    { kind: "note", title: "between Dialog.Menu and dialog body content" },
    { kind: "note", title: "split sections in Dropdown menus" },
    { kind: "note", title: "visual break in dense stacked panels" },
  ],
  a11y: {
    role: "separator (native hr)",
    keyboardNav: "Not focusable",
    ariaAttributes: [],
  },
  relatedComponents: ["Dialog", "Dropdown"],
  aiHints: {
    useCases: [
      "separate menu groups",
      "split dialog chrome from content",
      "section breaks in forms",
    ],
    avoid: [
      "vertical dividers — component is full-width hr",
      "spacing-only gaps without semantic sections",
      "replacing headings for grouping",
    ],
    composesWith: ["Dialog", "Dropdown"],
  },
};
