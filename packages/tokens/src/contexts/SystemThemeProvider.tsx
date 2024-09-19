import React from "react";
import { ThemeProvider } from "styled-components";
import { useColorMode } from "./ColorModeProvider";
import { light_mono, dark_mono } from "../themes";

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

    if (colorMode === ColorModesEnum.Dark) return dark_mono;
    if (colorMode === ColorModesEnum.Light) return light_mono;

    return light_mono;
  };

  return <ThemeProvider theme={activeTheme()}>{children}</ThemeProvider>;
};
