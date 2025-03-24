import React from "react";
import { ThemeProvider } from "styled-components";
import { useColorMode } from "./ColorModeProvider";
import { design_system_themes } from "../";

import { ColorModesEnum, IReactChildren } from "../../../../types";

export interface ISystemThemeProvider {
  theme?: unknown;
  children: React.ReactNode;
}
export const SystemThemeProvider = ({
  theme,
  children,
}: ISystemThemeProvider) => {
  const prefs = useColorMode();

  const activeTheme = () => {
    if (theme) return theme;

    if (prefs?.colorMode === ColorModesEnum.Dark)
      return design_system_themes.dark;
    if (prefs?.colorMode === ColorModesEnum.Light)
      return design_system_themes.light;

    return design_system_themes.dark;
  };

  return <ThemeProvider theme={activeTheme()}>{children}</ThemeProvider>;
};
