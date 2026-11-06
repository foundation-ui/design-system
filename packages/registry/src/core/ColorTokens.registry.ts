import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const ColorTokensMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateColorTokens",
  title: "Generate Color Tokens",
  description: "Generate Color Design Tokens using custom values.",
  module: "@usefui/core",
  code: `import { generateColorTokens } from "@usefui/core";

const name = "color-dt";
const hex = "ff0000";
const variants = {
    alpha: true,
    tint: true,
    shade: true,
};

const colorToken = generateColorTokens(name, hex, variants);`,
  properties: [
    {
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "hex",
      type: "string",
      required: true,
    },
    {
      name: "variations",
      type: "{ alpha?: boolean; tint?: boolean; shade?: boolean; }",
      required: true,
    },
  ],
  returnProperties: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "base",
      type: "IColorVariation",
    },
    {
      name: "alpha",
      type: "IColorVariation[] | []",
    },
    {
      name: "tint",
      type: "IColorVariation[] | []",
    },
    {
      name: "shade",
      type: "IColorVariation[] | []",
    },
  ],
  types: `type TColorVariant = "alpha" | "tint" | "shade";
type TColorFormat = "hex" | "rgb" | "hsl";

interface IContrastScore {
  light: string;
  dark: string;
}

interface IColorVariation {
  hex?: string;
  rgb?: string;
  hsl?: string;
  contrast_score?: IContrastScore;
}

interface IColorProperties {
  alpha?: IColorVariation[] | [];
  tint?: IColorVariation[] | [];
  shade?: IColorVariation[] | [];
}`,
};
