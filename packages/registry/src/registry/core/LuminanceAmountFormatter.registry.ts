import { luminanceAmountFormatter } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = luminanceAmountFormatter;

export const LuminanceAmountFormatterMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "luminanceAmountFormatter",
  title: "Luminance Amount Formatter",
  description:
    "Computes the next normalized luminance step (0.1 .. 1) from the length of an accumulating variations array, saturating at 1.",
  module: "@usefui/core",
  code: `import { luminanceAmountFormatter } from "@usefui/core";

const amount = luminanceAmountFormatter([{ hex: "#FFFFFF20" }]); // → 0.2
const maxed = luminanceAmountFormatter(new Array(9).fill({})); // → 1`,
  properties: [
    { name: "array", type: "string | unknown[]", required: true },
  ],
  returnProperties: [{ name: "amount", type: "number" }],
  types: `type TColorVariations = unknown[];`,
};
