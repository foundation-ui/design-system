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
      type: "IDTCGGroup",
      required: true,
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
  $root?: IDTCGToken;
  [key: string]: any;
}
interface IDTCGGroup extends IDTCGToken {}`,
  css: `.color-dark {
   color: var(--color-dark) !important;
}

.bg-dark {
   background-color: var(--color-dark) !important;
}`,
};
