import React from "react";

interface IABVariant {
  sizes?: Record<string, string>;
  fonts?: Record<string, string>;
  theme?: string;
  components?: Record<string, string>;
  layouts?: Record<string, string>;
  features?: Record<string, string>;
  pages?: Record<string, string>;
  translations?: Record<string, string>;
  custom?: Record<string, string>;
}
interface IuseABArgs {
  enabled: boolean;
  randomize: {
    threshold: number;
    triggerKey: number;
    defaultVersion: number;
    targetVersion: number;
  };
  variations: IABVariant[];
}
interface IuseABProperties {
  version: number;
  variant: IABVariant;
  forceABVersion: (version: number) => void;
}

export const useABTesting = (config: IuseABArgs): IuseABProperties => {
  const { enabled, randomize, variations } = config;
  const [version, setVersion] = React.useState<number>(
    randomize.defaultVersion || 0
  );
  const ticket = React.useMemo(() => {
    return enabled ? Math.floor(Math.random() * randomize.threshold) : null;
  }, []);

  React.useLayoutEffect(() => {
    if (ticket === randomize.triggerKey) {
      setVersion(randomize.targetVersion);
    }
  }, []);

  // Ensure the version is always within bounds of the variations array
  const abVersion = version >= 0 && version < variations.length ? version : 0;
  return {
    version: abVersion,
    variant: variations[abVersion]!,
    forceABVersion: (version: number) => setVersion(version),
  };
};
