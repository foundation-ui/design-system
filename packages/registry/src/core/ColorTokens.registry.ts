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
      name: "$description",
      type: "string",
    },
    {
      name: "$root",
      type: "IDTCGToken",
    },
    {
      name: "alpha",
      type: "IDTCGGroup",
    },
    {
      name: "tint",
      type: "IDTCGGroup",
    },
    {
      name: "shade",
      type: "IDTCGGroup",
    },
  ],
  types: `interface IDTCGColorValue {
  colorSpace: "srgb";
  components: [number, number, number];
  alpha: number;
  hex: string;
}

interface IDTCGExtensions {
  "com.usefui"?: {
    rgb?: string;
    hsl?: string;
    contrast_score?: { light: string; dark: string };
  };
}

interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $root?: IDTCGToken;
  $extensions?: IDTCGExtensions;
  [key: string]: any;
}

interface IDTCGGroup extends IDTCGToken {}

interface IDTCGColorGroup extends IDTCGGroup {}`,
};
