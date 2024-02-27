import React from "react";
import { ThemeProvider } from "styled-components";
import { ColorModeContext } from "./ColorModeProvider";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";
import { ColorModesEnum } from "../../../../types";
import { IDesignTokensLibrary, IReactChildren } from "../../../../types";

export interface ISystemThemeProvider {
  theme?: IDesignTokensLibrary;
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
