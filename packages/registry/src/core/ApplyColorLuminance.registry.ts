import { applyColorLuminance } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = applyColorLuminance;

export const ApplyColorLuminanceMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "applyColorLuminance",
  title: "Apply Color Luminance",
  description:
    "Lightens or darkens a hex color by applying a luminance factor per RGB channel. Accepts 3- or 6-digit hex (with or without #). Returns undefined for invalid hex.",
  module: "@usefui/core",
  code: `import { applyColorLuminance, LuminanceFactorsEnum } from "@usefui/core";

const brighter = applyColorLuminance("#6f2a2a", 0.5);
// → "#b79595"

const darker = applyColorLuminance("#6f2a2a", LuminanceFactorsEnum.Lum50);`,
  properties: [
    { name: "hex", type: "string", required: true },
    { name: "luminance", type: "LuminanceFactorsEnum | undefined", required: true },
  ],
  returnProperties: [{ name: "hex", type: "string | undefined" }],
  types: `enum LuminanceFactorsEnum {
  Lum0 = 0,
  Lum10 = 0.1,
  Lum20 = 0.2,
  Lum30 = 0.3,
  Lum40 = 0.4,
  Lum50 = 0.5,
  Lum60 = 0.6,
  Lum70 = 0.7,
  Lum80 = 0.8,
  Lum90 = 0.9,
  Lum100 = 1,
}
type THex = string;
type TLuminance = LuminanceFactorsEnum | undefined;`,
};
