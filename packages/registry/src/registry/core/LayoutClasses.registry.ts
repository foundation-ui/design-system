import { generateLayoutClasses } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = generateLayoutClasses;

export const LayoutClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateLayoutClasses",
  title: "Generate Layout CSS Classes",
  description:
    "Generate flex and grid display utilities with alignment, wrapping, and direction helpers.",
  module: "@usefui/core",
  code: `import { generateLayoutClasses } from "@usefui/core";

const LayoutClasses = generateLayoutClasses();`,
  properties: [],
  returnProperties: [
    {
      name: "css",
      type: "string",
    },
  ],
  types: "",
  css: `.flex {
    display: flex;
}
.justify-start {
    justify-content: flex-start;
}
.justify-center {
    justify-content: center;
}
.justify-between {
    justify-content: space-between;
}
.align-start {
    align-items: flex-start;
}
.align-center {
    align-items: center;
}
.flex-wrap {
    flex-wrap: wrap;
}
.grid {
    display: grid;
}`,
};
