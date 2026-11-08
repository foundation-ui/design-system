import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const ColorClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateColorClasses",
  title: "Generate Color Classes",
  description:
    "Generate color utility classes for base tokens and their alpha/tint/shade steps across text, background, border, outline, fill, stroke, decoration, accent, and caret properties. Values reference the generated CSS variables.",
  module: "@usefui/core",
  code: `import { generateColorClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const design_tokens = js_design_tokens;
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
  css: `.color-mono-dark {
  color: var(--color-mono-dark) !important;
}
.bg-mono-dark {
  background-color: var(--color-mono-dark) !important;
}
.border-color-mono-dark {
  border-color: var(--color-mono-dark) !important;
}
.color-alpha-red-10 {
  color: var(--alpha-red-10) !important;
}
.bg-shade-red-20 {
  background-color: var(--shade-red-20) !important;
}`,
};
