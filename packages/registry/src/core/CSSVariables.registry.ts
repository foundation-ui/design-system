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

const cssVariables = generateCSSVariables(js_design_tokens);`,
  properties: [
    {
      name: "design_tokens",
      type: "IDTCGDesignTokensSet",
      required: true,
    },
  ],
  returnProperties: [
    { name: "color", type: "string[]" },
    { name: "alpha", type: "string[]" },
    { name: "tint", type: "string[]" },
    { name: "shade", type: "string[]" },
    { name: "fontsize", type: "string[]" },
    { name: "measurement", type: "string[]" },
    { name: "depth", type: "string[]" },
    { name: "opacity", type: "string[]" },
  ],
  types: `interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $root?: IDTCGToken;
  $extensions?: { "com.usefui"?: Record<string, any> };
  [key: string]: any;
}

interface IDTCGGroup extends IDTCGToken {}

interface IDTCGDesignTokensSet extends IDTCGToken {
  $description?: string;
  color?: IDTCGGroup;
  measurement?: IDTCGGroup;
  fontsize?: IDTCGGroup;
  depth?: IDTCGGroup;
  opacity?: IDTCGGroup;
}`,
  css: `:root {
  --color-dark: #353531;
  --fontsize-small-10: 1.13rem;
  --measurement-small-10: 0.30375rem;
  --depth-layout-10: 1;
  --opacity-base-10: 0.1;
}`,
};
