import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const SizeClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateSizeClasses",
  title: "Generate Size CSS Classes",
  description:
    "Generate spacing scale CSS classes: padding (p-*), margin (m-*), gap (g-*), with axis suffixes.",
  module: "@usefui/core",
  code: `import { generateSizeClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const { design_tokens } = js_design_tokens;
const cssSizeClasses = generateSizeClasses(design_tokens.measurement);`,
  properties: [
    {
      name: "sizes",
      type: "Size[] | []",
      required: true,
    },
  ],
  returnProperties: [
    {
      name: "css",
      type: "string",
    },
  ],
  types: `interface IScaleVariation {
  px: number;
  rem: number;
  pt: number;
}
interface IScaleProperties {
  units: number;
  ratio: number;
  variant?: TScaleVariant;
  values: IScaleVariation[] | [];
}
interface Size extends IScaleProperties {
  name: string;
}`,
  css: `.p-small-10 {
  padding: 1.13px;
}
.p-x-small-10 {
  padding-left: 1.13px;
  padding-right: 1.13px;
}
.g-medium-30 {
  gap: 7.5px;
}`,
};
