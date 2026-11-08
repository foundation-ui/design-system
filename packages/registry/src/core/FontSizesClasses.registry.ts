import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const FontSizesClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateFontSizesClasses",
  title: "Generate Font Size CSS Classes",
  description:
    "Generate font-size CSS classes (fs-{scale}-{step}) from token scales small, medium, and large. Values reference the generated CSS variables by default.",
  module: "@usefui/core",
  code: `import { generateFontSizesClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const design_tokens = js_design_tokens;
const cssFSClasses = generateFontSizesClasses(design_tokens.fontsize);

// Pass { useVars: false } to emit resolved rem values instead of var(--fontsize-*).
const cssLiteralFSClasses = generateFontSizesClasses(design_tokens.fontsize, {
  useVars: false,
});`,
  properties: [
    {
      name: "fs",
      type: "IDTCGGroup",
      required: true,
    },
    {
      name: "options",
      type: "{ useVars?: boolean }",
      required: false,
    },
  ],
  returnProperties: [
    {
      name: "css",
      type: "string",
    },
  ],
  types: `interface IDTCGDimensionValue {
  value: number;
  unit: "px" | "rem" | "pt";
}
interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $extensions?: { "dev.usefui"?: { px?: number; rem?: number; pt?: number } };
  [key: string]: any;
}
interface IDTCGGroup extends IDTCGToken {}`,
  css: `.fs-small-10 {
  font-size: var(--fontsize-small-10);
}
.fs-medium-10 {
  font-size: var(--fontsize-medium-10);
}
.fs-large-10 {
  font-size: var(--fontsize-large-10);
}`,
};
