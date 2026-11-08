
import type { GeneratorRegistryMetadata } from "@chambellan/contracts";


export const TokensLibraryMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateTokensLibrary",
  title: "Generate Design Tokens Library",
  description:
    "Generate a complete Design Tokens library from a structured template payload.",
  module: "@usefui/core",
  code: `import { generateTokensLibrary } from "@usefui/core";

const tokenLibrary = generateTokensLibrary("demo-dt", [
  {
    type: 'measurement',
    values: [{
      name: "small",
      base: 3,
      ratio: 1.62,
      units: 2,
    }]
  },
  {
    type: "color",
    values: [{
      name: "purple",
      base: "944BBB",
      variations: {
        alpha: true,
        shade: true,
        tint: true
      }
    }]
  },
]);`,
  properties: [
    {
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "template",
      type: "ITemplatePayload[]",
      required: true,
    },
  ],
  returnProperties: [
    {
      name: "$description",
      type: "string",
    },
    {
      name: "color",
      type: "IDTCGGroup",
    },
    {
      name: "measurement",
      type: "IDTCGGroup",
    },
    {
      name: "fontsize",
      type: "IDTCGGroup",
    },
    {
      name: "depth",
      type: "IDTCGGroup",
    },
    {
      name: "opacity",
      type: "IDTCGGroup",
    },
  ],
  types: `interface ITemplateValues {
  name?: string;
  base?: string | number;
  ratio?: number;
  units?: number;
  steps?: number;
  decimal?: boolean;
  variations?: {
    alpha?: boolean;
    shade?: boolean;
    tint?: boolean;
  };
}

interface IDTCGToken {
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
};
