import React from "react";
import { ThemeProvider } from "styled-components";
import { design_system_themes } from "@foundation/tokens";
import { ColorModeContext } from "./ColorModeProvider";

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
  };

  return (
    <ThemeProvider theme={theme || defaultTheme()}>{children}</ThemeProvider>
  );
};
