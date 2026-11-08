import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const GenerateCSSClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateCSSClasses",
  title: "Generate CSS Classes",
  description:
    "Generate the full utility class set in one call: colors, spacing, box sizing, typography, opacity, depth, layout, and dimensions. Pair with generateCSSVariables or generateCSSVariablesStylesheet because color, scale, and sequence classes reference var(--*).",
  module: "@usefui/core",
  code: `import {
  generateCSSClasses,
  generateCSSVariables,
} from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const cssVariables = generateCSSVariables(js_design_tokens);
const cssClasses = generateCSSClasses(js_design_tokens);

// Pass { useVars: false } to emit resolved scale/sequence values. Color
// utilities always reference CSS variables.
const cssLiteralClasses = generateCSSClasses(js_design_tokens, {
  useVars: false,
});`,
  properties: [
    {
      name: "design_tokens",
      type: "IDTCGDesignTokensSet",
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
  css: `.color-mono-dark {
  color: var(--color-mono-dark) !important;
}
.p-small-10 {
  padding: var(--measurement-small-10);
}
.w-small-10 {
  width: var(--measurement-small-10);
}
.fs-small-10 {
  font-size: var(--fontsize-small-10);
}
.opacity-default-10 {
  opacity: var(--opacity-default-10);
}
.z-default-10 {
  z-index: var(--depth-default-10);
}
.flex-column {
  flex-direction: column;
}
.w-100 {
  width: 100%;
}`,
};
