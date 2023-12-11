import React from "react";
import { ThemeProvider } from "styled-components";
import { ColorModeContext } from "./ColorModeProvider";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";
import { ColorModesEnum } from "../../../../types";

export type TTheme = typeof darkTheme;
export const Theme = ({ theme, children }: any) => {
  const UISysPrefs = React.useContext(ColorModeContext);
  const themeDefinition =
    UISysPrefs && UISysPrefs.colorMode === ColorModesEnum.Dark
      ? darkTheme
      : lightTheme;

  return (
    <ThemeProvider theme={theme || themeDefinition}>{children}</ThemeProvider>
  );
};
