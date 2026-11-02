import { generateSequenceVariation } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = generateSequenceVariation;

export const GenerateSequenceVariationMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateSequenceVariation",
  title: "Generate Sequence Variation",
  description:
    "Builds a depth variation (usage + stack order) from a sequence index, or an opacity variation (usage + light/dark contrast scores) from a contrast value.",
  module: "@usefui/core",
  code: `import { generateSequenceVariation, generateSequences } from "@usefui/core";

generateSequenceVariation({ contrast: 0.1 });
// → { contrast_score: { dark: "F", light: "F" }, usage: ["backdrop", "transparent"] }

generateSequenceVariation({
  sequence: generateSequences({ base: 1, units: 10, steps: 10, decimal: false }),
  index: 5,
});
// → { stack_order: { label: "median", score: 2 }, usage: ["fixed", "off-canvas", "overlay"] }`,
  properties: [
    { name: "contrast", type: "number" },
    { name: "sequence", type: "number[]" },
    { name: "index", type: "number" },
  ],
  returnProperties: [
    { name: "usage", type: "string[]" },
    { name: "stack_order", type: "IStackOrder" },
    { name: "contrast_score", type: "{ light: string; dark: string }" },
  ],
  types: `interface IStackOrder {
  label: string;
  score: number;
}`,
};
