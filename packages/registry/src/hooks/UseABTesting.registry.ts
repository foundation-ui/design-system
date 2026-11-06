import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseABTestingMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useABTesting",
  title: "useABTesting",
  description:
    "Picks a random A/B version at load and exposes the selected variation, with an option to force a version.",
  component: "ABTesting",
  module: "@usefui/hooks",
  code: `import { useABTesting } from "@usefui/hooks";

const config = {
    silent: false,
    versions: { default: 0, alternative: 1 },
    randomize: { gamble: 1, odds: 2 },
    variations: [{ theme: "light" }, { theme: "dark" }],
};

export function HookComponent() {
    const { version, variant, forceABVersion } = useABTesting(config);

    return <div>Version {version}: {variant.theme}</div>;
}`,
  arguments: [
    {
      name: "config",
      type: "TABConfig",
      required: true,
    },
  ],
  returns: [
    {
      name: "version",
      type: "number",
    },
    {
      name: "variant",
      type: "TABVariant",
    },
    {
      name: "forceABVersion",
      type: "(version: number) => void",
    },
  ],
  types: `type TABVariant = {
  sizes?: Record<string, string>;
  fonts?: Record<string, string>;
  theme?: string;
  components?: Record<string, string>;
  layouts?: Record<string, string>;
  features?: Record<string, string>;
  pages?: Record<string, string>;
  translations?: Record<string, string>;
  custom?: Record<string, string>;
};

type TABConfig = {
  silent?: boolean;
  versions: { default: number; alternative: number };
  randomize: { gamble: number; odds: number };
  variations: Record<string, unknown>[];
};

interface IuseABProperties {
  version: number;
  variant: TABVariant;
  forceABVersion: (version: number) => void;
}`,
};
