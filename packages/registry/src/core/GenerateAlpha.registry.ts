import { generateAlpha } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = generateAlpha;

export const GenerateAlphaMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateAlpha",
  title: "Generate Alpha",
  description:
    "Generate an alpha (opacity) variation sequence of a color across hex, rgb, and hsl formats with contrast scores.",
  module: "@usefui/core",
  code: `import { generateAlpha } from "@usefui/core";

const alphaVariations = generateAlpha("ff0000", 10);

const baseColorToken = {
  name: "color-dt",
  base: { hex: "ff0000" },
  alpha: alphaVariations,
};`,
  properties: [
    {
      name: "Hex",
      type: "string",
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
  types: `interface IColorVariation {
  hex?: string;
  rgb?: string;
  hsl?: string;
  contrast_score?: {
    light: string;
    dark: string;
  };
}`,
};
