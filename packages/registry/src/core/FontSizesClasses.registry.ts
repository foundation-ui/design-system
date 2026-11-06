import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const FontSizesClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateFontSizesClasses",
  title: "Generate Font Size CSS Classes",
  description:
    "Generate font-size CSS classes (fs-{scale}-{step}) from token scales small, medium, and large.",
  module: "@usefui/core",
  code: `import { generateFontSizesClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const { design_tokens } = js_design_tokens;
const cssFSClasses = generateFontSizesClasses(design_tokens.fontsize);`,
  properties: [
    {
      name: "fs",
      type: "Size[]",
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
interface Size {
  name: string;
  values: IScaleVariation[];
  units?: number;
  ratio?: number;
  variant?: TScaleVariant;
}
type TScaleVariant = "fontsize" | "measurement";`,
  css: `.fs-small-10 {
  font-size: 6.779999999999999px;
}
.fs-medium-10 {
  font-size: 13.559999999999999px;
}
.fs-large-10 {
  font-size: 27.119999999999997px;
}`,
};
