import { getSequenceUsages } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = getSequenceUsages;

export const GetSequenceUsagesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "getSequenceUsages",
  title: "Get Sequence Usages",
  description:
    "Maps a stack order (depth mode) or a contrast score (opacity mode) to recommended usage labels.",
  module: "@usefui/core",
  code: `import { getSequenceUsages } from "@usefui/core";

getSequenceUsages(null, { label: "median", score: 2 });
// → ["fixed", "off-canvas", "overlay"]

getSequenceUsages("F"); // → ["backdrop", "transparent"]
getSequenceUsages("AAA"); // → ["icons", "animations", "layout"]`,
  properties: [
    { name: "contrastScore", type: "any | null" },
    { name: "stackOrder", type: "IStackOrder" },
  ],
  returnProperties: [{ name: "usages", type: "string[]" }],
  types: `interface IStackOrder {
  label: string;
  score: number;
}`,
};
