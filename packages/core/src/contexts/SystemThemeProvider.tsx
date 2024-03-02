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
  const themeDefinition =
    UISysPrefs && UISysPrefs.colorMode === ColorModesEnum.Dark
      ? design_system_themes.dark
      : design_system_themes.light;

  return (
    <ThemeProvider theme={theme || themeDefinition}>{children}</ThemeProvider>
  );
};
