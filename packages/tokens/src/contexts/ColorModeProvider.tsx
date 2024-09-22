import React from "react";
import { TColorMode, ColorModesEnum } from "../../../../types";

const STORAGE_KEY = "color-mode";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const LIGHT_QUERY = "(prefers-color-scheme: light)";
const SYSTEM_QUERY = "(prefers-color-scheme: system)";
const FONT_VAR = "--font-color";
const BODY_VAR = "--body-color";
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

type TFetchedColorMode = string | undefined | null;
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
  const root = document.documentElement;
  const locstore = window.localStorage;

  const fetchedMode = storage.get();
  const [colorMode, setColorMode] = React.useState<TFetchedColorMode>(
    fetchedMode || getPreferredColorScheme()
  );

  /**
   * IIFE <https://developer.mozilla.org/en-US/docs/Glossary/IIFE> used to avoid polluting the global namespace
   * and define color mode variables
   */
  (function () {
    const is_light = colorMode === ColorModesEnum.Light;
    const vars_array = Array.from(
      { length: 10 },
      (_, key: number) => (key + 1) * 10
    );

    if (colorMode) {
      root.style.setProperty(
        BODY_VAR,
        is_light ? "var(--color-mono-light)" : "var(--color-mono-darker)"
      );
      vars_array.forEach((index) =>
        root.style.setProperty(
          `${BODY_VAR}-alpha-${index}`,
          is_light
            ? `var(--alpha-mono-light-${index})`
            : `var(--alpha-mono-dark-${index})`
        )
      );

      root.style.setProperty(
        FONT_VAR,
        is_light ? "var(--color-mono-darkest)" : "var(--color-mono-white)"
      );
      vars_array.forEach((index) =>
        root.style.setProperty(
          `${FONT_VAR}-alpha-${index}`,
          is_light
            ? `var(--alpha-mono-darkest-${index})`
            : `var(--alpha-mono-white-${index})`
        )
      );
    }
  })();

  // Read the color mode from localStorage on render
  useClientsideEffect(() => {
    const canWriteMode =
      fetchedMode !== ColorModesEnum.System && fetchedMode !== colorMode;
    if (fetchedMode && canWriteMode) setColorMode(fetchedMode);
  }, []);

  // Save mode in localStorage when it is updated
  React.useEffect(() => {
    if (locstore && colorMode) storage.set(colorMode);
  }, [colorMode, window.localStorage]);

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
