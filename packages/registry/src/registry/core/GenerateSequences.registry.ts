import { generateSequences } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = generateSequences;

export const GenerateSequencesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateSequences",
  title: "Generate Sequences",
  description:
    "Generates an arithmetic sequence of unit values. With decimal, produces opacity-style values scaled by /100; otherwise depth-style values.",
  module: "@usefui/core",
  code: `import { generateSequences } from "@usefui/core";

const depth = generateSequences({ base: 1, units: 10, steps: 10, decimal: false });
// → [1, 11, 21, 31, 41, 51, 61, 71, 81, 91]

const opacity = generateSequences({ base: 1, units: 10, steps: 10, decimal: true });
// → [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]`,
  properties: [
    { name: "base", type: "number", required: true },
    { name: "units", type: "number", required: true },
    { name: "steps", type: "number", required: true },
    { name: "decimal", type: "boolean", required: true },
  ],
  returnProperties: [{ name: "sequence", type: "number[]" }],
  types: `type TSequencesOptions = {
  base: number;
  units: number;
  steps: number;
  decimal: boolean;
};`,
};
