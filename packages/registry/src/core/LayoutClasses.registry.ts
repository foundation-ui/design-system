import { generateLayoutClasses } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = generateLayoutClasses;

export const LayoutClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateLayoutClasses",
  title: "Generate Layout CSS Classes",
  description:
    "Generate display, alignment, placement, flex/grid, positioning, overflow, text, cursor, and pointer-events utilities.",
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
.grid {
  display: grid;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.align-center {
  align-items: center;
}
.place-center {
  place-items: center;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-column {
  flex-direction: column;
}
.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.pointer-events-none {
  pointer-events: none;
}`,
};
