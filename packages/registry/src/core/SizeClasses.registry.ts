
import type { GeneratorRegistryMetadata } from "@chambellan/contracts";


export const SizeClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateSizeClasses",
  title: "Generate Size CSS Classes",
  description:
    "Generate spacing scale CSS classes: padding (p-*), margin (m-*), gap (g-*), with axis suffixes.",
  module: "@usefui/core",
  code: `import { generateSizeClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const design_tokens = js_design_tokens;
const cssSizeClasses = generateSizeClasses(design_tokens.measurement);`,
  properties: [
    {
      name: "sizes",
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
  types: `interface IDTCGDimensionValue {
  value: number;
  unit: "px" | "rem" | "pt";
}
interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $extensions?: { "com.usefui"?: { px?: number; rem?: number; pt?: number } };
  [key: string]: any;
}
interface IDTCGGroup extends IDTCGToken {}`,
  css: `.p-small-10 {
  padding: 1.13px;
}
.p-x-small-10 {
  padding-left: 1.13px;
  padding-right: 1.13px;
}
.g-medium-30 {
  gap: 7.5px;
}`,
};
