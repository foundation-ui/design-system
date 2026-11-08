import { calculateContrastScore } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = calculateContrastScore;

export const CalculateContrastScoreMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "calculateContrastScore",
  title: "Calculate Contrast Score",
  description:
    "Return the WCAG contrast score (AAA, AA, AA Large, or F) for a text color against a background color.",
  module: "@usefui/core",
  code: `import { calculateContrastScore } from "@usefui/core";

const score = calculateContrastScore("ffffff", "000000"); // "AAA"
const failing = calculateContrastScore("cccccc", "ffffff"); // "F"`,
  properties: [
    {
      name: "textColor",
      type: "string",
      required: true,
    },
    {
      name: "backgroundColor",
      type: "string",
      required: true,
    },
  ],
  returnProperties: [
    {
      name: "score",
      type: '"AAA" | "AA" | "AA Large" | "F"',
    },
  ],
  types: `type TContrastScore = "AAA" | "AA" | "AA Large" | "F";`,
};
