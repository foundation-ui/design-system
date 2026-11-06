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
      name: "name",
      type: "string",
    },
    {
      name: "base",
      type: "number",
    },
    {
      name: "units",
      type: "number",
    },
    {
      name: "ratio",
      type: "number",
    },
    {
      name: "values",
      type: "{ pt: number; px: number; rem: number; }[]",
    },
  ],
  types: `type TMeasureVariant = "fontsize" | "measurement";

interface IScaleVariation {
  px: number;
  rem: number;
  pt: number;
}
interface IScaleProperties {
  units: number;
  ratio: number;
  variant?: TMeasureVariant;
  values: IScaleVariation[] | [];
}`,
};
