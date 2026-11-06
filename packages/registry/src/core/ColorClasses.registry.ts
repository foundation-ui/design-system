import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const ColorClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateColorClasses",
  title: "Generate Color Classes",
  description:
    "Generate text and background-color CSS classes using your design tokens library.",
  module: "@usefui/core",
  code: `import { generateColorClasses } from "@usefui/core";

const cssColorClasses = generateColorClasses(design_tokens.color);`,
  properties: [
    {
      name: "color",
      type: "Color[]",
      required: true,
    },
  ],
  returnProperties: [
    {
      name: "css",
      type: "string",
    },
  ],
  types: `interface IContrastScore {
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
}
interface Color extends IColorProperties {
  name: string;
}`,
  css: `.color-dark {
   color: var(--color-dark) !important;
}

.bg-dark {
   background-color: var(--color-dark) !important;
}`,
};
