import { calculateStackOrder } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = calculateStackOrder;

export const CalculateStackOrderMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "calculateStackOrder",
  title: "Calculate Stack Order",
  description:
    "Classifies an index relative to the midpoint of a sequence as low (1), median (2), or high (3) stack order.",
  module: "@usefui/core",
  code: `import { calculateStackOrder } from "@usefui/core";

const sequence = Array.from(Array(10).keys()); // [0..9]

calculateStackOrder(2, sequence); // → { label: "low", score: 1 }
calculateStackOrder(5, sequence); // → { label: "median", score: 2 }
calculateStackOrder(10, sequence); // → { label: "high", score: 3 }`,
  properties: [
    { name: "index", type: "number", required: true },
    { name: "sequence", type: "number[]", required: true },
  ],
  returnProperties: [
    { name: "label", type: '"low" | "median" | "high"' },
    { name: "score", type: "number" },
  ],
  types: `interface IStackOrder {
  label: string;
  score: number;
}`,
};
