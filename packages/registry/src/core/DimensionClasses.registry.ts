import { generateDimensionClasses } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = generateDimensionClasses;

export const DimensionClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateDimensionClasses",
  title: "Generate Dimension CSS Classes",
  description:
    "Generate width, height, min-*, max-*, screen, full, and dvh CSS classes using percentage, auto, and intrinsic sizing keywords.",
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
.min-w-100 {
  min-width: 100%;
}
.max-h-50 {
  max-height: 50%;
}
.w-screen {
  width: 100vw;
}
.h-dvh {
  height: 100dvh;
}
.w-auto {
  width: auto;
}
.h-fit-content {
  height: fit-content;
}`,
};
