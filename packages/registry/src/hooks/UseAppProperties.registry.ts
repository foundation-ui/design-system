import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseAppPropertiesMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useAppProperties",
  title: "useAppProperties",
  description:
    "Loads or seeds application properties (feature flags, translations, misc) from IndexedDB.",
  component: "AppProperties",
  module: "@usefui/hooks",
  code: `import { useAppProperties } from "@usefui/hooks";

export function HookComponent() {
    const props = useAppProperties({
        silent: false,
        config: { name: "app-db", stores: ["props"], version: 1 },
        source: {
            store: "props",
            key: "app",
            payload: { feature_flags: {}, translations: {}, miscs: {} },
        },
    });

    if (!props) return <div>Loading...</div>;

    return ( {/** Your code here **/} );
}`,
  arguments: [
    {
      name: "silent",
      type: "boolean",
      defaultValue: "false",
    },
    {
      name: "config",
      type: "TIDBConfig",
    },
    {
      name: "source",
      type: "TAppPropsSrc",
      required: true,
    },
  ],
  returns: [
    {
      name: "appProps",
      type: "IAppProperties | undefined",
    },
  ],
  types: `type TAppPropsSrc = {
  store?: string;
  key?: string;
  payload?: IAppProperties;
};

type TFeatFlagConfig = {
  enabled?: boolean;
  version?: number;
  variant?: string;
  sizing?: string;
  options?: { fixed?: boolean; open?: boolean };
};

interface IAppProperties {
  feature_flags?: Record<string, TFeatFlagConfig | unknown>;
  translations?: Record<string, unknown>;
  miscs?: Record<string, unknown>;
}

type TUIPropsConfig = {
  silent?: boolean;
  config: TIDBConfig;
  source: TAppPropsSrc;
};`,
};
