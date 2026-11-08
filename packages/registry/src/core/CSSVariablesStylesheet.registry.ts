import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const CSSVariablesStylesheetMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateCSSVariablesStylesheet",
  title: "Generate CSS Variables Stylesheet",
  description:
    "Flatten every CSS variable group produced by generateCSSVariables into a single ready-to-inject stylesheet.",
  module: "@usefui/core",
  code: `import { generateCSSVariablesStylesheet } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const stylesheet = generateCSSVariablesStylesheet(js_design_tokens);
// Override the selector when needed:
const scoped = generateCSSVariablesStylesheet(js_design_tokens, ".theme");`,
  properties: [
    {
      name: "design_tokens",
      type: "IDTCGDesignTokensSet",
      required: true,
    },
    {
      name: "selector",
      type: "string",
      required: false,
    },
  ],
  returnProperties: [
    {
      name: "stylesheet",
      type: "string",
    },
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
