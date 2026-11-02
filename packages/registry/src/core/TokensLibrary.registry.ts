import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const TokensLibraryMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateTokensLibrary",
  title: "Generate Design Tokens Library",
  description:
    "Generate a complete Design Tokens library from a structured template payload.",
  module: "@usefui/core",
  code: `import { generateTokensLibrary } from "@usefui/core";

const tokenLibrary = generateTokensLibrary("demo-dt", [
  {
    type: 'measurement',
    values: [{
      name: "small",
      base: 3,
      ratio: 1.62,
      units: 2,
    }]
  },
  {
    type: "color",
    values: [{
      name: "purple",
      base: "944BBB",
      variations: {
        alpha: true,
        shade: true,
        tint: true
      }
    }]
  },
]);`,
  properties: [
    {
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "template",
      type: "{ type: string; values: ITemplateValues[]; }",
      required: true,
    },
  ],
  returnProperties: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "design_tokens",
      type: "Record<'color' | 'measurement' | 'fontsize' | 'opacity' | 'depth', IComposedLibraryItem[]>",
    },
  ],
  types: `interface ITemplateValues {
  name?: string;
  base?: string | number;
  ratio?: number;
  units?: number;
  steps?: number;
  decimal?: boolean;
  variations?: {
    alpha?: boolean;
    shade?: boolean;
    tint?: boolean;
  };
}

interface IComposedLibraryItem {
  name?: string;
  base?: number | IColorVariation;
  alpha?: any[] | [];
  tint?: any[] | [];
  shade?: any[] | [];
  units?: number;
  ratio?: number;
  variant?: TScaleVariant;
  values?: ISequenceVariation[] | IScaleVariation[] | [];
}

interface IDesignTokensSet {
  color: IComposedLibraryItem[];
  measurement: IComposedLibraryItem[];
  fontsize: IComposedLibraryItem[];
  depth: IComposedLibraryItem[];
  opacity: IComposedLibraryItem[];
}

interface IDesignTokensLibrary {
  name: string;
  design_tokens: IDesignTokensSet;
}`,
};
