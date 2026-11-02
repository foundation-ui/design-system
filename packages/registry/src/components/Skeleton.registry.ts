import { ComponentRegistryMetadata } from "@chambellan/contracts";

export const SkeletonMeta: ComponentRegistryMetadata = {
  name: "Skeleton",
  description:
    "Placeholder blocks that convey loading while preserving approximate layout.",
  category: "feedback",
  variants: [],
  title: "Skeleton",
  props: [
    {
      name: "sizing",
      type: '"small" | "medium" | "large"',
      defaultValue: "medium",
    },
    {
      name: "shape",
      type: '"round" | "smooth" | "square"',
      defaultValue: "smooth",
    },
  ],
  usage: [
    `import React from "react";
import { Skeleton } from "@usefui/components";

function SkeletonTemplate() {

    return (
      <div className="grid align-center g-medium-60 justify-center p-t-large-30 p-x-medium-60">
        <div className="flex align-center justify-center g-medium-30 ">
          <Skeleton sizing="small" />
          <Skeleton sizing="medium" />
          <Skeleton sizing="large" />
        </div>
        <div className="flex align-center justify-center g-medium-30">
          <Skeleton shape="square" />
          <Skeleton shape="smooth" />
          <Skeleton shape="round" />
        </div>
      </div>
    );

}

export default SkeletonTemplate;`,
  ],
  anatomy: `import { Skeleton } from "@usefui/components";

export function SkeletonComponent() {
    return <Skeleton />;
}`,

  examples: [
    { kind: "note", title: "sizing small, medium, large" },
    { kind: "note", title: "shape variants for chips vs blocks" },
    { kind: "note", title: "list or card placeholder rows" },
  ],
  a11y: {
    role: "span with tabIndex 0",
    keyboardNav: "Focusable unless removed by parent",
    ariaAttributes: [],
  },
  relatedComponents: ["Shimmer", "Page"],
  aiHints: {
    useCases: [
      "card and list layout placeholders",
      "avatar or text line placeholders",
    ],
    avoid: [
      "skeleton after content loaded",
      "focusable skeleton in tab order without purpose",
      "replacing Loader for short inline waits",
    ],
    composesWith: ["Page"],
  },
};
