import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const CSSVariablesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateCSSVariables",
  title: "Generate CSS Variables",
  description:
    "Generate CSS variables from a Design Tokens library, including color, alpha, tint, shade, fontsize, measurement, depth, and opacity. Each group is returned as an array of declarations; use generateCSSVariablesStylesheet for a ready-to-inject stylesheet.",
  module: "@usefui/core",
  code: `import { generateCSSVariables } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const cssVariables = generateCSSVariables(js_design_tokens);

const stylesheet = \`:root {
\${Object.values(cssVariables).flat().join("\\n")}
}\`;`,
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
  $extensions?: { "dev.usefui"?: Record<string, any> };
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
  --color-mono-dark: #262626;
  --alpha-mono-dark-10: rgba(38, 38, 38, 0.1);
  --fontsize-small-10: 0.42374999999999996rem;
  --measurement-small-10: 0.070625rem;
  --depth-default-10: 10;
  --opacity-default-10: 0.1;
}`,
};
