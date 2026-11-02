import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const MeasurementRatiosMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "MeasurementRatios",
  title: "Measurement Ratios",
  description:
    "Named table of the seven modular-scale ratios available for measurement token generation.",
  module: "@usefui/core",
  code: `import { MeasurementRatios, generateModularScales } from "@usefui/core";

const perfectFifth = MeasurementRatios.find(
  (ratio) => ratio.name === "Perfect Fifth"
); // → { name: "Perfect Fifth", value: 1.5 }

const scale = generateModularScales({
  base: 16,
  ratio: [perfectFifth.value],
  units: 4,
}); // → [16, 24, 36, 54]`,
  properties: [],
  returnProperties: [
    { name: "name", type: "string" },
    { name: "value", type: "RatioEnum" },
  ],
  types: `enum RatioEnum {
  MinorSecond = 16 / 15,
  MajorSecond = 9 / 8,
  MinorThird = 6 / 5,
  MajorThird = 5 / 4,
  PerfectFourth = 4 / 3,
  PerfectFifth = 3 / 2,
  GoldenRatio = 1.618,
}`,
};
