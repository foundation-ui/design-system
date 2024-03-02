import React from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "@foundation/tokens";
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
  const themeDefinition =
    UISysPrefs && UISysPrefs.colorMode === ColorModesEnum.Dark
      ? darkTheme
      : lightTheme;

  return (
    <ThemeProvider theme={theme || themeDefinition}>{children}</ThemeProvider>
  );
};
