import React from "react";
import { TColorMode, ColorModesEnum } from "../../../../types";

export const ColorModeContext = React.createContext<null | any>(null);
export const useColorMode = () => React.useContext(ColorModeContext);

export const ColorModeProvider = ({ children }: any) => {
  const [colorMode, rawSetColorMode] = React.useState(GetInitialColorMode);
  const setColorMode = (value: TColorMode) => {
    rawSetColorMode(value);
    window.localStorage.setItem("color-mode", value);
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
export const GetInitialColorMode = () => {
  const persistedColorPreference = window.localStorage.getItem("color-mode");
  const hasPersistedPreference = typeof persistedColorPreference === "string";
  const mediaQueryList = window.matchMedia(
    `(prefers-color-scheme: ${ColorModesEnum.System})`
  );
  const hasMediaQueryPreference = typeof mediaQueryList.matches === "boolean";

  if (hasPersistedPreference) return persistedColorPreference;
  if (hasMediaQueryPreference && mediaQueryList.matches)
    return ColorModesEnum.System;

  return ColorModesEnum.Dark;
};
