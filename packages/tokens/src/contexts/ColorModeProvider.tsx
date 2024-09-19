import React from "react";
import { TColorMode, ColorModesEnum } from "../../../../types";
import { design_system_themes } from "../";

const STORAGE_KEY = "color-mode";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const LIGHT_QUERY = "(prefers-color-scheme: light)";
const SYSTEM_QUERY = "(prefers-color-scheme: system)";

const ERRLOG =
  "[foundation-ui] - localStorage is disabled and color mode might not work as expected.";

const storage = {
  get: () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.warn(ERRLOG, error);
    }
  },
  set: (value: string) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      console.warn(ERRLOG, error);
    }
  },
};

export const getPreferredColorScheme = (): TColorMode | null => {
  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia(DARK_QUERY).matches) return "dark";
    if (window.matchMedia(LIGHT_QUERY).matches) return "light";
    if (window.matchMedia(SYSTEM_QUERY).matches) return "system";
  }
  return null;
};

export const useClientsideEffect =
  typeof window === "undefined" ? () => {} : React.useLayoutEffect;
export const useColorMode = () => React.useContext(ColorModeContext);

export const ColorModeContext = React.createContext<null | any>(null);
export const ColorModeProvider = ({ children }: any) => {
  const [colorMode, setColorMode] = React.useState<TColorMode | string | null>(
    getPreferredColorScheme()
  );

  // Read the color mode from localStorage on render
  useClientsideEffect(() => {
    const getStoredMode = (): void | TColorMode | undefined => {
      if (window.localStorage) storage.get();
    };

    const fetchedMode = getStoredMode();
    const canWriteMode = fetchedMode !== "system" && fetchedMode !== colorMode;

    if (fetchedMode && canWriteMode) setColorMode(fetchedMode);
  }, []);

  // Save mode in localStorage when it is updated
  React.useEffect(() => {
    if (window.localStorage && colorMode) storage.set(colorMode);
  }, [colorMode, window.localStorage]);

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
