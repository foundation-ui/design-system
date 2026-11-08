import { generateTokensFromTemplate } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = generateTokensFromTemplate;

export const GenerateTokensFromTemplateMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateTokensFromTemplate",
  title: "Generate Tokens From Template",
  description:
    "Dispatches template values to the matching token generator based on payload.type: color, measurement, fontsize, depth, or opacity.",
  module: "@usefui/core",
  code: `import { generateTokensFromTemplate } from "@usefui/core";

generateTokensFromTemplate({
  type: "color",
  values: [
    { name: "red", base: "cc0000", variations: { alpha: false, shade: false, tint: false } },
  ],
});

generateTokensFromTemplate({
  type: "depth",
  values: [{ name: "layout", base: 1, units: 2, steps: 10 }],
});`,
  properties: [
    { name: "payload", type: "ITemplatePayload", required: true },
  ],
  returnProperties: [{ name: "tokens", type: "IDTCGGroup[]" }],
  types: `interface ITemplatePayload {
  type: "color" | "measurement" | "fontsize" | "depth" | "opacity";
  values: Array<{
    name?: string;
    base?: string | number;
    ratio?: number;
    units?: number;
    steps?: number;
    decimal?: boolean;
    variations?: { alpha?: boolean; shade?: boolean; tint?: boolean };
  }>;
  data?: any[];
}

interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $root?: IDTCGToken;
  $extensions?: { "dev.usefui"?: Record<string, any> };
  [key: string]: any;
}

interface IDTCGGroup extends IDTCGToken {}`,
};