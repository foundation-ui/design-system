import { PXToREM } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = PXToREM;

export const PXToREMMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "PXToREM",
  title: "PX To REM",
  description:
    "Converts a pixel value to rem units assuming a 16px root font size.",
  module: "@usefui/core",
  code: `import { PXToREM } from "@usefui/core";

PXToREM(16); // → 1
PXToREM(12); // → 0.75`,
  properties: [{ name: "value", type: "number", required: true }],
  returnProperties: [{ name: "rem", type: "number" }],
  types: `type TPixels = number;
type TRem = number;`,
};
