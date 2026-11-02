import { getContrastRatio } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = getContrastRatio;

export const GetContrastRatioMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "getContrastRatio",
  title: "Get Contrast Ratio",
  description:
    "Computes the WCAG 2.x contrast ratio between two RGB colors, from 1 (identical) to 21 (black on white).",
  module: "@usefui/core",
  code: `import { getContrastRatio } from "@usefui/core";

const max = getContrastRatio([255, 255, 255], [0, 0, 0]); // → 21
const min = getContrastRatio([255, 255, 255], [255, 255, 255]); // → 1`,
  properties: [
    { name: "textRgb", type: "[number, number, number]", required: true },
    { name: "backgroundRgb", type: "[number, number, number]", required: true },
  ],
  returnProperties: [{ name: "ratio", type: "number" }],
  types: `type TRgb = [number, number, number];`,
};
