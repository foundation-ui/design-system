import { HEXToHSL } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = HEXToHSL;

export const HEXToHSLMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "HEXToHSL",
  title: "HEX To HSL",
  description:
    "Converts a hex color to a modern hsl() CSS string, or to a raw [h, s, l] array with raw.",
  module: "@usefui/core",
  code: `import { HEXToHSL } from "@usefui/core";

HEXToHSL("ffffff"); // → "hsl(0deg 0% 100%)"
HEXToHSL("cc0000", true); // → [0, 100, 40]`,
  properties: [
    { name: "hex", type: "string", required: true },
    { name: "raw", type: "boolean" },
  ],
  returnProperties: [{ name: "hsl", type: "string | number[]" }],
  types: `type THsl = [number, number, number];`,
};
