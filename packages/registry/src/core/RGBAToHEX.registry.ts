import { RGBAToHEX } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = RGBAToHEX;

export const RGBAToHEXMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "RGBAToHEX",
  title: "RGBA To HEX",
  description:
    "Alpha-blends an rgba() color over a background hex color and returns an uppercase #RRGGBB hex. Returns undefined when the rgba string does not match the expected format.",
  module: "@usefui/core",
  code: `import { RGBAToHEX } from "@usefui/core";

RGBAToHEX("rgba(255, 255, 255, 0.1)", "000000");
// → "#1A1A1A"`,
  properties: [
    { name: "rgba", type: "string", required: true },
    { name: "backgroundHex", type: "string", required: true },
  ],
  returnProperties: [{ name: "hex", type: "string | undefined" }],
  types: `type THex = string;
type TRgba = string;`,
};
