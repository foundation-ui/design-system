import { applyColorLuminance } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = applyColorLuminance;

export const ApplyColorLuminanceMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "applyColorLuminance",
  title: "Apply Color Luminance",
  description:
    "Lightens or darkens a hex color by applying a luminance factor per RGB channel. Returns undefined for hex strings shorter than 6 characters.",
  module: "@usefui/core",
  code: `import { applyColorLuminance } from "@usefui/core";

const brighter = applyColorLuminance("#6f2a2a", 0.5);
// → "#a73f3f"

const darker = applyColorLuminance("#6f2a2a", -0.5);`,
  properties: [
    { name: "hex", type: "string", required: true },
    { name: "luminance", type: "number | undefined", required: true },
  ],
  returnProperties: [{ name: "hex", type: "string" }],
  types: `type THex = string;
type TLuminance = LuminanceFactorsEnum | undefined;`,
};
