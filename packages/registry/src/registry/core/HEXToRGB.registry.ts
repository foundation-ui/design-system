import { HEXToRGB } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = HEXToRGB;

export const HEXToRGBMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "HEXToRGB",
  title: "HEX To RGB",
  description:
    "Converts a hex color to an rgb() CSS string, or to a raw [r, g, b] tuple with raw.",
  module: "@usefui/core",
  code: `import { HEXToRGB } from "@usefui/core";

HEXToRGB("ffffff"); // → "rgb(255, 255, 255)"
HEXToRGB("#cc0000", true); // → [204, 0, 0]`,
  properties: [
    { name: "Hex", type: "string", required: true },
    { name: "raw", type: "boolean" },
  ],
  returnProperties: [
    { name: "rgb", type: "string | [number, number, number]" },
  ],
  types: `type TRgb = [number, number, number];`,
};
