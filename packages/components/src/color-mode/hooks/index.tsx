"use client";

import React from "react";
import { TColorMode, ColorModesEnum } from "@usefui/core";
import { ColorModeConfig, ColorModeContextType, ResolvedMode } from "../types";

import {
  listeners,
  storage,
  getSystemMode,
  applyToDocument,
  subscribePreference,
  getPreference,
  subscribeSystem,
  buildInitScript,
  isMode,
} from "../utils";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

export const ColorModeContext =
  React.createContext<ColorModeContextType | null>(null);

export const useColorMode = () => {
  const context = React.useContext(ColorModeContext);
  if (!context)
    throw new Error("useColorMode must be used within ColorModeProvider");
  return context;
};

export const ColorModeProvider = ({
  config,
  disableTransitionOnChange,
  children,
}: {
  config?: ColorModeConfig;
  disableTransitionOnChange?: boolean;
  children: React.ReactNode;
}) => {
  // Server snapshot is constant => no hydration mismatch.
  const preference = React.useSyncExternalStore(
    subscribePreference,
    getPreference,
    () => "system" as TColorMode,
  );
  const system = React.useSyncExternalStore(
    subscribeSystem,
    getSystemMode,
    () => "light" as ResolvedMode,
  );
  const resolvedColorMode: ResolvedMode =
    preference === "system" ? system : (preference as ResolvedMode);

  const configKey = JSON.stringify(config ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableConfig = React.useMemo(() => config, [configKey]);

  const suppressTransitions =
    disableTransitionOnChange ?? config?.disableTransitionOnChange ?? true;

  useIsomorphicLayoutEffect(() => {
    applyToDocument(resolvedColorMode, stableConfig, suppressTransitions);
  }, [resolvedColorMode, stableConfig, suppressTransitions]);

  const setColorMode = React.useCallback((mode: TColorMode) => {
    if (!isMode(mode)) return;
    storage.set(mode);
    listeners.forEach((l) => l());
  }, []);

  const script = React.useMemo(
    () => buildInitScript(stableConfig),
    [stableConfig],
  );

  const value = React.useMemo(
    () => ({ colorMode: preference, resolvedColorMode, setColorMode }),
    [preference, resolvedColorMode, setColorMode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: script }}
      />
      {children}
    </ColorModeContext.Provider>
  );
};
