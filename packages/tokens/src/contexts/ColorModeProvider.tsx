"use client";

import React from "react";
import { TColorMode, ColorModesEnum } from "../../../../types";

const STORAGE_KEY = "color-mode";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const LIGHT_QUERY = "(prefers-color-scheme: light)";
const SYSTEM_QUERY = "(prefers-color-scheme: system)";
const CONTRAST_VAR = "--contrast-color";
const FONT_VAR = "--font-color";
const BODY_VAR = "--body-color";

type FetchedColorModeType = string | undefined | null;

type ColorModeItem = {
  light: string;
  dark: string;
};

type ColorModeConfig = {
  font?: ColorModeItem;
  body?: ColorModeItem;
  contrast?: ColorModeItem;
};

const storage = {
  get: () => {
    if (typeof window === "undefined") return null; // Prevents SSR crash
    return window?.localStorage?.getItem(STORAGE_KEY) ?? null;
  },
  set: (value: string) => window?.localStorage?.setItem(STORAGE_KEY, value),
};

export const getPreferredColorScheme = (): TColorMode => {
  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia(DARK_QUERY).matches) return "dark";
    if (window.matchMedia(LIGHT_QUERY).matches) return "light";
    if (window.matchMedia(SYSTEM_QUERY).matches) return "system";
  }

  return "system"; // Safe initialization
};

export const writeColorModeStyles = (
  colorMode: TColorMode,
  config?: ColorModeConfig
) => {
  // Ensure safe usage of window and document
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const head = document.head ?? document?.getElementsByTagName("head")[0];
  const current = head.querySelector('style[title="color_mode_vars"]');

  // Remove existing value if defined to prevent duplication
  if (current) head.removeChild(current);

  const style = document.createElement("style");
  style.type = "text/css";
  style.title = "color_mode_vars";

  const is_light = colorMode === ColorModesEnum.Light;
  const vars_array = Array.from({ length: 10 }, (_, key) => (key + 1) * 10);

  let css = "";

  /**
   * Flip the colors orders to handle contrasted values such as Font colors.
   * For instnace: If customColor colors will be used on top of a highly contrasted body,
   * the values passed to generateAlphaVars for customColor should be chromatically opposed to
   * the body's.
   *
   * This should be enhanced to handle default preferences in a better way.
   */

  if (colorMode) {
    const fontColor = is_light
      ? config?.font?.light ?? "var(--color-mono-darkest)"
      : config?.font?.dark ?? "var(--color-mono-white)";

    const bodyColor = is_light
      ? config?.body?.light ?? "var(--color-mono-white)"
      : config?.body?.dark ?? "var(--color-mono-darker)";

    const contrastColor = is_light
      ? config?.contrast?.light ?? "var(--color-mono-light)"
      : config?.contrast?.dark ?? "var(--color-mono-dark)";

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
        ${FONT_VAR}: ${fontColor};
        ${generateAlphaVars(
          FONT_VAR,
          config?.font?.light ?? "alpha-mono-darkest",
          config?.font?.dark ?? "alpha-mono-white"
        )}

        ${BODY_VAR}: ${bodyColor};
        ${generateAlphaVars(
          BODY_VAR,
          config?.body?.light ?? "alpha-mono-white",
          config?.body?.dark ?? "alpha-mono-darker"
        )}

        ${CONTRAST_VAR}: ${contrastColor};
        ${generateAlphaVars(
          CONTRAST_VAR,
          config?.contrast?.light ?? "alpha-mono-light",
          config?.contrast?.dark ?? "alpha-mono-dark"
        )}
      }`.replace(/\s/g, ""); // minify string
  }

  // Append style element to head
  if (css) style.textContent = css;
  head.appendChild(style);
};

/** Context */

export const useColorMode = () => {
  const context = React.useContext(ColorModeContext);
  if (!context)
    throw new Error("useColorMode must be used within ColorModeProvider");
  return context;
};

export const ColorModeContext = React.createContext<{
  colorMode: FetchedColorModeType;
  setColorMode: (mode: TColorMode) => void;
} | null>(null);

export const ColorModeProvider = ({
  config,
  children,
}: {
  config?: ColorModeConfig;
  children: React.ReactNode;
}) => {
  const fetchedMode = storage.get() as ColorModesEnum;
  const [colorMode, setColorMode] = React.useState<FetchedColorModeType>(
    fetchedMode ?? getPreferredColorScheme()
  );

  /**
   * IIFE <https://developer.mozilla.org/en-US/docs/Glossary/IIFE> runs as soon as it is defined.
   * Used to write CSS vars defined by the color mode as soon a every values are available.
   */
  (function () {
    return writeColorModeStyles(colorMode as TColorMode, config);
  })();

  // Read the color mode from localStorage on render
  React.useEffect(() => {
    const canWriteMode =
      fetchedMode !== ColorModesEnum.System && fetchedMode !== colorMode;
    if (fetchedMode && canWriteMode) setColorMode(fetchedMode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save mode in localStorage when it is updated
  React.useEffect(() => {
    if (colorMode) {
      document.documentElement.setAttribute("data-theme", colorMode);
      storage.set(colorMode);
    }
  }, [colorMode]);

  // Prevents flicker by not rendering anything until mode is known
  if (!colorMode) return null;
  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
