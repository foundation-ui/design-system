
import type { GeneratorRegistryMetadata } from "@chambellan/contracts";


export const GenerateModularScalesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateModularScales",
  title: "Generate Modular Scales",
  description:
    "Generates a modular scale by multiplying a base value through a single ratio. With convert, returns px/rem/pt objects and excludes the base value from the output.",
  module: "@usefui/core",
  code: `import { generateModularScales, MeasurementRatios } from "@usefui/core";

const scale = generateModularScales({
  base: 16,
  ratio: [MeasurementRatios[5].value],
  units: 8,
});
// → [16, 24, 36, 54, 81, 121.5, 182.25, 273.375]

const converted = generateModularScales({
  base: 16,
  ratio: [3 / 2],
  units: 4,
  convert: true,
});
// → [{ px, rem, pt }, ...] (units - 1 items)`,
  properties: [
    { name: "base", type: "number", required: true },
    { name: "ratio", type: "[number]", required: true },
    { name: "units", type: "number", required: true },
    { name: "convert", type: "boolean" },
  ],
  returnProperties: [
    { name: "px", type: "number" },
    { name: "rem", type: "number" },
    { name: "pt", type: "number" },
  ],
  types: `type TModularScalesOptions = {
  base: number;
  ratio: [number];
  units: number;
  convert?: boolean;
};

interface IScaleVariation {
  px: number;
  rem: number;
  pt: number;
}`,
};
