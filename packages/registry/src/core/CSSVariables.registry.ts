import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const CSSVariablesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateCSSVariables",
  title: "Generate CSS Variables",
  description:
    "Generate CSS variables from a Design Tokens library, including color, alpha, tint, shade, fontsize, measurement, depth, and opacity.",
  module: "@usefui/core",
  code: `import { generateCSSVariables } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const cssVariables = generateCSSVariables({
  name: js_design_tokens.name,
  design_tokens: js_design_tokens.design_tokens,
});`,
  properties: [
    {
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "design_tokens",
      type: "IDesignTokensSet",
      required: true,
    },
  ],
  returnProperties: [
    { name: "color", type: "string[] | string[][]" },
    { name: "alpha", type: "string[] | string[][]" },
    { name: "tint", type: "string[] | string[][]" },
    { name: "shade", type: "string[] | string[][]" },
    { name: "fontsize", type: "string[] | string[][]" },
    { name: "measurement", type: "string[] | string[][]" },
    { name: "depth", type: "string[] | string[][]" },
    { name: "opacity", type: "string[] | string[][]" },
  ],
  types: `interface IScaleVariation {
  px: number;
  rem: number;
  pt: number;
}

interface IColorVariation {
  hex?: string;
  rgb?: string;
  hsl?: string;
  contrast_score?: IContrastScore;
}

interface ISequenceVariation {
  value: number;
  usage: string[];
  contrast_score?: IContrastScore;
  stack_order?: IStackOrder;
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

type TScaleVariant = "fontsize" | "measurement";

interface IDesignTokensLibrary {
  name: string;
  design_tokens: IDesignTokensSet;
}`,
  css: `:root {
  --color-dark: #353531;
  --fontsize-small-10: 1.13rem;
  --measurement-small-10: 0.30375rem;
  --depth-layout-10: 1;
  --opacity-base-10: 0.1;
}`,
};
