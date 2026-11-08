import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const BoxClassesMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateBoxClasses",
  title: "Generate Box CSS Classes",
  description:
    "Generate sizing, inset, border-width, and border-radius utilities (w-*, h-*, size-*, min/max-*, inset/top/right/bottom/left-*, border-w-*, rounded-*) from the measurement scale. Values reference the generated CSS variables by default.",
  module: "@usefui/core",
  code: `import { generateBoxClasses } from "@usefui/core";
import { js_design_tokens } from "@usefui/tokens";

const design_tokens = js_design_tokens;
const cssBoxClasses = generateBoxClasses(design_tokens.measurement);

// Pass { useVars: false } to emit resolved rem values instead of var(--measurement-*).
const cssLiteralBoxClasses = generateBoxClasses(design_tokens.measurement, {
  useVars: false,
});`,
  properties: [
    {
      name: "sizes",
      type: "IDTCGGroup",
      required: true,
    },
    {
      name: "options",
      type: "{ useVars?: boolean }",
      required: false,
    },
  ],
  returnProperties: [
    {
      name: "css",
      type: "string",
    },
  ],
  types: `interface IDTCGDimensionValue {
  value: number;
  unit: "px" | "rem" | "pt";
}
interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $extensions?: { "com.usefui"?: { px?: number; rem?: number; pt?: number } };
  [key: string]: any;
}
interface IDTCGGroup extends IDTCGToken {}`,
  css: `.w-small-10 {
  width: var(--measurement-small-10);
}
.h-medium-30 {
  height: var(--measurement-medium-30);
}
.size-medium-10 {
  width: var(--measurement-medium-10);
  height: var(--measurement-medium-10);
}
.rounded-large-20 {
  border-radius: var(--measurement-large-20);
}`,
};
