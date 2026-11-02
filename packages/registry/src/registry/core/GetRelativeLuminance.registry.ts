import { getRelativeLuminance } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = getRelativeLuminance;

export const GetRelativeLuminanceMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "getRelativeLuminance",
  title: "Get Relative Luminance",
  description:
    "Computes the WCAG 2.x relative luminance of an RGB triple (0-255 channels), returning a normalized value between 0 and 1.",
  module: "@usefui/core",
  code: `import { getRelativeLuminance } from "@usefui/core";

const white = getRelativeLuminance([255, 255, 255]); // → 1
const black = getRelativeLuminance([0, 0, 0]); // → 0`,
  properties: [
    { name: "rgb", type: "[number, number, number]", required: true },
  ],
  returnProperties: [{ name: "luminance", type: "number" }],
  types: `type TRgb = [number, number, number];`,
};
