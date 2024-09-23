import React from "react";
import { TColorMode, ColorModesEnum } from "../../../../types";

const STORAGE_KEY = "color-mode";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const LIGHT_QUERY = "(prefers-color-scheme: light)";
const SYSTEM_QUERY = "(prefers-color-scheme: system)";
const FONT_VAR = "--font-color";
const BODY_VAR = "--body-color";
const ERRLOG =
  "[foundation] localStorage is disabled and color mode might not work as expected.";

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
  const locstore = window.localStorage;
  const fetchedMode = storage.get();

  const [colorMode, setColorMode] = React.useState<TFetchedColorMode>(
    fetchedMode || getPreferredColorScheme()
  );

  /**
   * IIFE <https://developer.mozilla.org/en-US/docs/Glossary/IIFE> runs as soon as it is defined.
   * Used to write CSS vars defined by the color mode as soon a every values are available.
   */
  (function () {
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.type = "text/css";
    style.title = "color_mode_vars";

    const is_light = colorMode === ColorModesEnum.Light;
    const vars_array = Array.from({ length: 10 }, (_, key) => (key + 1) * 10);

    let css = "";
    if (colorMode) {
      const bodyColor = is_light
        ? "var(--color-mono-light)"
        : "var(--color-mono-darker)";
      const fontColor = is_light
        ? "var(--color-mono-darkest)"
        : "var(--color-mono-white)";

      const generateAlphaVars = (
        baseVar: string,
        lightPrefix: string,
        darkPrefix: string
      ) =>
        vars_array
          .map(
            (index) =>
              `${baseVar}-alpha-${index}: var(${
                is_light
                  ? `--${lightPrefix}-${index}`
                  : `--${darkPrefix}-${index}`
              });`
          )
          .join("\n");

      css = `:root {
        ${BODY_VAR}: ${bodyColor};
        ${generateAlphaVars(BODY_VAR, "alpha-mono-light", "alpha-mono-dark")}
        ${FONT_VAR}: ${fontColor};
        ${generateAlphaVars(FONT_VAR, "alpha-mono-darkest", "alpha-mono-white")}
      }`.replace(/\s/g, ""); // minify string
    }

    // Append style element to head
    if (css) style.textContent = css;
    head.appendChild(style);
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
