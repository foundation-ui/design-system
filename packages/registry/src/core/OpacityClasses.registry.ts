import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const OpacityClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateOpacityClasses",
  title: "Generate Opacity CSS Classes",
  description:
    "Generate opacity CSS classes (opacity-{scale}-{step}) from token sequences default and extended.",
  module: "@usefui/core",
  code: `import { generateOpacityClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const { design_tokens } = js_design_tokens;
const cssOpacityClasses = generateOpacityClasses(design_tokens.opacity);`,
  properties: [
    {
      name: "opacity",
      type: "ISequenceProperties[]",
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

interface IStackOrder {
  index: number;
  order: number;
}

interface ISequenceVariation {
  value: number;
  usage: string[];
  contrast_score?: IContrastScore;
  stack_order?: IStackOrder;
}
interface ISequenceProperties {
  base: number;
  units: number;
  steps: number;
  name: string;
  values: ISequenceVariation[];
}`,
  css: `.opacity-default-10 {
  opacity: 0.1;
}
.opacity-default-50 {
  opacity: 0.5;
}
.opacity-default-100 {
  opacity: 1;
}`,
};
