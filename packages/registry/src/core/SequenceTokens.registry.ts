import { generateSequenceTokens } from "@usefui/core";

import type { GeneratorRegistryMetadata } from "@chambellan/contracts";

export const fn = generateSequenceTokens;

export const SequenceTokensMeta: GeneratorRegistryMetadata = {
  kind: "generator",
  name: "generateSequenceTokens",
  title: "Generate Sequence Tokens",
  description: "Generate Sequence Design Tokens using custom values.",
  module: "@usefui/core",
  code: `import { generateSequenceTokens } from "@usefui/core";

const name = "zindex-dt";
const base = 12;
const units = 10;
const steps = 10;
const decimal = false;

const sequenceTokens = generateSequenceTokens(name, base, units, steps, decimal);`,
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
      name: "steps",
      type: "number",
      required: true,
    },
    {
      name: "decimal",
      type: "boolean",
      required: true,
    },
  ],
  returnProperties: [
    {
      name: "$description",
      type: "string",
    },
    {
      name: "[step]",
      type: "{ $value: number; $extensions: IDTCGExtensions }",
    },
  ],
  types: `interface IContrastScore {
  light: string;
  dark: string;
}
interface IStackOrder {
  label: string;
  score: number;
}
interface IDTCGExtensions {
  "com.usefui"?: {
    usage?: string[];
    contrast_score?: IContrastScore;
    stack_order?: IStackOrder;
  };
}
interface IDTCGToken {
  $type?: string;
  $value?: any;
  $description?: string;
  $extensions?: IDTCGExtensions;
  [key: string]: any;
}
interface IDTCGGroup extends IDTCGToken {}
interface IDTCGSequenceGroup extends IDTCGGroup {}`,
};
