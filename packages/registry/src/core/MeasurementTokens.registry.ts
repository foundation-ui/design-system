import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const MeasurementTokensMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateMeasurementTokens",
  title: "Generate Measurement Tokens",
  description: "Generate Measurement Design Tokens using custom values.",
  module: "@usefui/core",
  code: `import { generateMeasurementTokens } from "@usefui/core";

const name = "ms-dt";
const base = 12;
const units = 10;
const ratio = 16 / 15;

const msTokens = generateMeasurementTokens(name, base, units, ratio);`,
  properties: [
    {
      name: "name",
      type: "string",
      required: true,
    },
    {
      name: "base",
      type: "number",
      required: true,
    },
    {
      name: "units",
      type: "number",
      required: true,
    },
    {
      name: "ratio",
      type: "number",
      required: true,
    },
    {
      name: "variant",
      type: "'fontsize' | 'measurement'",
    },
  ],
  returnProperties: [
    {
      name: "$description",
      type: "string",
    },
    {
      name: "[step]",
      type: "{ $value: IDTCGDimensionValue; $extensions: IDTCGExtensions }",
    },
  ],
  types: `type TMeasureVariant = "fontsize" | "measurement";

interface IDTCGDimensionValue {
  value: number;
  unit: "px" | "rem" | "pt";
}

interface IDTCGExtensions {
  "dev.usefui"?: {
    px?: number;
    rem?: number;
    pt?: number;
  };
}

interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $extensions?: IDTCGExtensions;
  [key: string]: any;
}

interface IDTCGGroup extends IDTCGToken {}

interface IDTCGScaleGroup extends IDTCGGroup {}`,
};
