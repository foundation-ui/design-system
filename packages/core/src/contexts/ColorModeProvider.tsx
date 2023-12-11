import React, { createContext } from "react";
import { TColorMode, ColorModesEnum } from "../../../../types";

export const ColorModeContext = createContext<null | any>(null);
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
    `(prefers-color-scheme: ${ColorModesEnum.Light})`
  );
  const hasMediaQueryPreference = typeof mediaQueryList.matches === "boolean";

  if (hasPersistedPreference) return persistedColorPreference;
  if (hasMediaQueryPreference)
    return mediaQueryList.matches ? ColorModesEnum.Dark : ColorModesEnum.Light;

  return ColorModesEnum.Light;
};
