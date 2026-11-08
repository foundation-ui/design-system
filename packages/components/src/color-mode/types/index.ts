import type { TColorMode } from "@usefui/core";

export type ResolvedMode = "light" | "dark";
export type ColorModeItem = { light: string; dark: string };
export type ColorModeConfig = {
  font?: ColorModeItem;
  body?: ColorModeItem;
  contrast?: ColorModeItem;
  disableTransitionOnChange?: boolean;
};

export type ColorModeContextType = {
  colorMode: TColorMode; // User preference: "light" | "dark" | "system"
  resolvedColorMode: ResolvedMode;
  setColorMode: (mode: TColorMode) => void;
};
