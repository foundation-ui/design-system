import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const DepthClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateDepthClasses",
  title: "Generate Depth CSS Classes",
  description:
    "Generate z-index utility classes (z-{scale}-{step}) from token sequences default and extended. Values reference the generated CSS variables by default.",
  module: "@usefui/core",
  code: `import { generateDepthClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const design_tokens = js_design_tokens;
const cssDepthClasses = generateDepthClasses(design_tokens.depth);

// Pass { useVars: false } to emit literal values instead of var(--depth-*).
const cssLiteralDepthClasses = generateDepthClasses(design_tokens.depth, {
  useVars: false,
});`,
  properties: [
    {
      name: "depth",
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
  $extensions?: { "com.usefui"?: Record<string, any> };
  [key: string]: any;
}
interface IDTCGGroup extends IDTCGToken {}`,
  css: `.z-default-10 {
  z-index: var(--depth-default-10);
}
.z-default-50 {
  z-index: var(--depth-default-50);
}
.z-extended-100 {
  z-index: var(--depth-extended-100);
}`,
};
