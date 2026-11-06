
import type { GeneratorRegistryMetadata } from "@chambellan/contracts";


export const GenerateVariationMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateVariation",
  title: "Generate Variation",
  description:
    "Generate tint or shade variation sequences of a color by applying luminance in lighten or darken mode.",
  module: "@usefui/core",
  code: `import { generateVariation } from "@usefui/core";

const tints = generateVariation("ff0000", "lighten", 10);
const shades = generateVariation("ff0000", "darken", 10);

const colorToken = {
  name: "color-dt",
  base: { hex: "ff0000" },
  tint: tints,
  shade: shades,
};`,
  properties: [
    {
      name: "Hex",
      type: "string",
      required: true,
    },
    {
      name: "mode",
      type: '"lighten" | "darken"',
      required: true,
    },
    {
      name: "amount",
      type: "number",
      defaultValue: "10",
    },
  ],
  returnProperties: [
    {
      name: "hex",
      type: "string",
    },
    {
      name: "rgb",
      type: "string",
    },
    {
      name: "hsl",
      type: "string",
    },
    {
      name: "contrast_score",
      type: "{ light: string; dark: string; }",
    },
  ],
  types: `type TMode = "lighten" | "darken";

interface IColorVariation {
  hex?: string;
  rgb?: string;
  hsl?: string;
  contrast_score?: {
    light: string;
    dark: string;
  };
}`,
};
