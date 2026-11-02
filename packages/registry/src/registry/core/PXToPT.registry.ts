import { PXToPT } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = PXToPT;

export const PXToPTMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "PXToPT",
  title: "PX To PT",
  description: "Converts a pixel value to points (px * 0.75).",
  module: "@usefui/core",
  code: `import { PXToPT } from "@usefui/core";

PXToPT(12); // → 9`,
  properties: [{ name: "value", type: "number", required: true }],
  returnProperties: [{ name: "pt", type: "number" }],
  types: `type TPixels = number;
type TPoints = number;`,
};
