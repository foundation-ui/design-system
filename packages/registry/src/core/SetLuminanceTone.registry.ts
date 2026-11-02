import { setLuminanceTone } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = setLuminanceTone;

export const SetLuminanceToneMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "setLuminanceTone",
  title: "Set Luminance Tone",
  description:
    "Returns the luminance tone, negating its sign when mode is darken so it can be fed to applyColorLuminance.",
  module: "@usefui/core",
  code: `import { setLuminanceTone } from "@usefui/core";

const lighten = setLuminanceTone(0.2); // → 0.2
const darken = setLuminanceTone(0.2, "darken"); // → -0.2`,
  properties: [
    { name: "tone", type: "number", required: true },
    { name: "mode", type: '"darken" | "lighten"' },
  ],
  returnProperties: [{ name: "tone", type: "number" }],
  types: `type TTone = number;
type TMode = "darken" | "lighten";`,
};
