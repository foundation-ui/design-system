import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const ScrollAreaMeta: ComponentRegistryMetadata = {
  name: "ScrollArea",
  description:
    "Wraps content with native scroll and optional visible scrollbar styling.",
  category: "layout",
  variants: [],
  title: "Scroll Area",
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
    },
    {
      name: "scrollbar",
      type: "boolean",
      defaultValue: "false",
    },
  ],
  usage: [
    `import React from "react";
import { ScrollArea } from "@usefui/components";

function ScrollAreaTemplate() {

    return (
        <div className="grid g-medium-30 p-t-large-30 p-x-medium-60">

        </div>
    );

}

export default ScrollAreaTemplate;`,
  ],
  anatomy: `import { ScrollArea } from "@usefui/components";

export function ScrollAreaComponent() {
    return <ScrollArea>Content</ScrollArea>;
}`,

  examples: [
    { kind: "note", title: "scrollbar false hides scrollbar (default)" },
    { kind: "note", title: "Scrollbar story with scrollbar visible" },
    {
      kind: "note",
      title: "styled as prop for custom element (Table uses as TableLayer)",
    },
    { kind: "note", title: "Page.Content and Accordion panel bodies" },
  ],
  a11y: {
    role: "wrapper aria-hidden true on chrome",
    keyboardNav: "Native scroll on content",
    ariaAttributes: ["aria-hidden on wrapper"],
  },
  relatedComponents: ["DataTable", "Page", "Select", "Accordion"],
  aiHints: {
    useCases: [
      "constrained-height panels",
      "scrollable listbox in Select",
      "hidden scrollbars in dense UI",
    ],
    avoid: [
      "sole readable region without exposing children to AT",
      "whole-page scroll replacement",
    ],
    composesWith: ["DataTable", "Page.Content", "Select.Content"],
  },
};
