
import type { GeneratorRegistryMetadata } from "@chambellan/contracts";


export const SizeClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateSizeClasses",
  title: "Generate Size CSS Classes",
  description:
    "Generate spacing scale CSS classes: padding (p-*), margin (m-*), gap (g-*), and margin-auto helpers with axis suffixes. Values reference the generated CSS variables by default.",
  module: "@usefui/core",
  code: `import { generateSizeClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const design_tokens = js_design_tokens;
const cssSizeClasses = generateSizeClasses(design_tokens.measurement);

// Pass { useVars: false } to emit resolved rem values instead of var(--measurement-*).
const cssLiteralClasses = generateSizeClasses(design_tokens.measurement, {
  useVars: false,
});`,
  properties: [
    {
      name: "sizes",
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
  css: `.p-small-10 {
  padding: var(--measurement-small-10);
}
.p-x-small-10 {
  padding-left: var(--measurement-small-10);
  padding-right: var(--measurement-small-10);
}
.g-medium-30 {
  gap: var(--measurement-medium-30);
}
.m-x-auto {
  margin-left: auto;
  margin-right: auto;
}`,
};
