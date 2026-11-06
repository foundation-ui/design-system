import { RGBToHSL } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = RGBToHSL;

export const RGBToHSLMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "RGBToHSL",
  title: "RGB To HSL",
  description:
    "Converts separate 0-255 RGB channels to an [h, s, l] array with hue in 0-360 and saturation/lightness in 0-100.",
  module: "@usefui/core",
  code: `import { RGBToHSL } from "@usefui/core";

RGBToHSL(255, 0, 0); // → [0, 100, 50]
RGBToHSL(0, 255, 0); // → [120, 100, 50]`,
  properties: [
    { name: "r", type: "number", required: true },
    { name: "g", type: "number", required: true },
    { name: "b", type: "number", required: true },
  ],
  returnProperties: [{ name: "hsl", type: "number[]" }],
  types: `type THsl = number[];`,
};
