import { generateDimensionClasses } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = generateDimensionClasses;

export const DimensionClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateDimensionClasses",
  title: "Generate Dimension CSS Classes",
  description:
    "Generate width and height CSS classes (w-* and h-*) using percentage, auto, and intrinsic sizing keywords.",
  module: "@usefui/core",
  code: `import { generateDimensionClasses } from "@usefui/core";

const DimensionClasses = generateDimensionClasses();`,
  properties: [],
  returnProperties: [
    {
      name: "css",
      type: "string",
    },
  ],
  types: "",
  css: `.w-100 {
    width: 100%;
}
.w-50 {
    width: 50%;
}
.w-auto {
    width: auto;
}
.w-fit-content {
    width: fit-content;
}
.h-100 {
    height: 100%;
}
.h-auto {
    height: auto;
}
.h-fit-content {
    height: fit-content;
}`,
};
