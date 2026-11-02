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

  const [version, setVersion] = React.useState<number>(
    () => versions.default ?? 0
  );

  const ticket = React.useMemo(() => {
    return Math.floor(Math.random() * randomize.odds);
  }, [randomize.odds]);

  React.useLayoutEffect(() => {
    if (silent) return;
    if (ticket === randomize.gamble) {
      setVersion(versions.alternative);
    }
  }, [silent, ticket, randomize.gamble, versions.alternative]);

  // Ensure the version is always within bounds of the variations array
  const clampVersion = (value: number): number =>
    value >= 0 && value < variations.length ? value : 0;

  if (silent) {
    const inertVersion = clampVersion(versions.default ?? 0);

    return {
      version: inertVersion,
      variant: (variations[inertVersion] ?? {}) as TABVariant,
      forceABVersion: () => undefined,
    };
  }

  const abVersion = clampVersion(version);

  return {
    version: abVersion,
    variant: (variations[abVersion] ?? {}) as TABVariant,
    forceABVersion: setVersion,
  };
};
