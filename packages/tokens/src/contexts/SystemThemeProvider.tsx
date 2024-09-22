import React from "react";
import { ThemeProvider } from "styled-components";
import { useColorMode } from "./ColorModeProvider";
import { design_system_themes } from "../";

import { ColorModesEnum, IReactChildren } from "../../../../types";

export interface ISystemThemeProvider {
  theme?: unknown;
  children: IReactChildren | React.ReactNode | any;
}
export const SystemThemeProvider = ({
  theme,
  children,
}: ISystemThemeProvider) => {
  const { colorMode } = useColorMode();

  const activeTheme = () => {
    if (theme) return theme;

    if (colorMode === ColorModesEnum.Dark) return design_system_themes.dark;
    if (colorMode === ColorModesEnum.Light) return design_system_themes.light;

    return design_system_themes.dark;
  };

  return <ThemeProvider theme={activeTheme()}>{children}</ThemeProvider>;
};
