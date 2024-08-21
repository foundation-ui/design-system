import React from "react";

export type TABVariant = {
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
export type TABConfig = {
  silent?: boolean;
  versions: {
    default: number;
    alternative: number;
  };
  randomize: {
    gamble: number;
    odds: number;
  };
  variations: Record<string, unknown>[];
};

export interface IuseABProperties {
  version: number;
  variant: TABVariant;
  forceABVersion: (version: number) => void;
}

export const useABTesting = (config: TABConfig): IuseABProperties => {
  const { silent, randomize, versions, variations } = config;

  if (silent) return;

  const [version, setVersion] = React.useState<number>(versions.default || 0);
  const ticket = React.useMemo(() => {
    return Math.floor(Math.random() * randomize.odds);
  }, []);

  React.useLayoutEffect(() => {
    if (ticket === randomize.gamble) {
      setVersion(versions.alternative);
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
