import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const OpacityClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateOpacityClasses",
  title: "Generate Opacity CSS Classes",
  description:
    "Generate opacity CSS classes (opacity-{scale}-{step}) from token sequences default and extended. Values reference the generated CSS variables by default.",
  module: "@usefui/core",
  code: `import { generateOpacityClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const design_tokens = js_design_tokens;
const cssOpacityClasses = generateOpacityClasses(design_tokens.opacity);

// Pass { useVars: false } to emit literal values instead of var(--opacity-*).
const cssLiteralOpacityClasses = generateOpacityClasses(
  design_tokens.opacity,
  { useVars: false },
);`,
  properties: [
    {
      name: "opacity",
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
  types: `interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $extensions?: { "dev.usefui"?: Record<string, any> };
  [key: string]: any;
}
interface IDTCGGroup extends IDTCGToken {}`,
  css: `.opacity-default-10 {
  opacity: var(--opacity-default-10);
}
.opacity-default-50 {
  opacity: var(--opacity-default-50);
}
.opacity-default-100 {
  opacity: var(--opacity-default-100);
}`,
};
