import React from "react";
import { ThemeProvider } from "styled-components";
import { ColorModeContext } from "./ColorModeProvider";
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
  const UISysPrefs = React.useContext(ColorModeContext);

  const defaultTheme = () => {
    const mode = UISysPrefs && UISysPrefs.colorMode;

    if (mode === ColorModesEnum.Dark) return design_system_themes.dark_mono;
    if (mode === ColorModesEnum.Light) return design_system_themes.light_mono;

    return design_system_themes.dark;
  };

  return (
    <ThemeProvider theme={theme || defaultTheme()}>{children}</ThemeProvider>
  );
};
