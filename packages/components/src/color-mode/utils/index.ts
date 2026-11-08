import {
  STORAGE_KEY,
  DARK_QUERY,
  LIGHT_QUERY,
  STYLE_TITLE,
  CONTRAST_VAR,
  FONT_VAR,
  BODY_VAR,
} from "../constants";

import { ResolvedMode, ColorModeConfig } from "../types";
import { TColorMode, ColorModesEnum } from "@usefui/core";

export const listeners = new Set<() => void>();
export const storage = {
  get: (): string | null => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  },
  set: (value: string) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  },
};

export const isMode = (v: unknown): v is TColorMode =>
  v === "light" || v === "dark" || v === "system";

/** Kept for backward compat. Returns "system" when there is no OS preference. */
export const getPreferredColorScheme = (): TColorMode => {
  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia(DARK_QUERY).matches) return "dark";
    if (window.matchMedia(LIGHT_QUERY).matches) return "light";
  }
  return "system";
};

export const getSystemMode = (): ResolvedMode =>
  window.matchMedia?.(DARK_QUERY).matches ? "dark" : "light";

/** CSS generation (pure, output unchanged for light/dark) */

export const buildColorModeCss = (
  colorMode: TColorMode,
  config?: ColorModeConfig,
) => {
  const is_light = colorMode === ColorModesEnum.Light;
  const vars_array = Array.from({ length: 10 }, (_, key) => (key + 1) * 10);

  const fontColor = is_light
    ? (config?.font?.light ?? "var(--color-mono-darkest)")
    : (config?.font?.dark ?? "var(--color-mono-white)");
  const bodyColor = is_light
    ? (config?.body?.light ?? "var(--color-mono-white)")
    : (config?.body?.dark ?? "var(--color-mono-darker)");
  const contrastColor = is_light
    ? (config?.contrast?.light ?? "var(--color-mono-light)")
    : (config?.contrast?.dark ?? "var(--color-mono-dark)");

  const generateAlphaVars = (
    baseVar: string,
    lightPrefix: string,
    darkPrefix: string,
  ) =>
    vars_array
      .map(
        (index) =>
          `${baseVar}-alpha-${index}: var(${
            is_light ? `--${lightPrefix}-${index}` : `--${darkPrefix}-${index}`
          });`,
      )
      .join("\n");

  return `:root {
    ${FONT_VAR}: ${fontColor};
    ${generateAlphaVars(
      FONT_VAR,
      config?.font?.light ?? "alpha-mono-darkest",
      config?.font?.dark ?? "alpha-mono-white",
    )}
    ${BODY_VAR}: ${bodyColor};
    ${generateAlphaVars(
      BODY_VAR,
      config?.body?.light ?? "alpha-mono-white",
      config?.body?.dark ?? "alpha-mono-darker",
    )}
    ${CONTRAST_VAR}: ${contrastColor};
    ${generateAlphaVars(
      CONTRAST_VAR,
      config?.contrast?.light ?? "alpha-mono-light",
      config?.contrast?.dark ?? "alpha-mono-dark",
    )}
  }`
    .replace(/\s+/g, " ")
    .replace(/\s*([{};:,])\s*/g, "$1")
    .trim(); // minify, preserving spaces inside function values
};

export const writeColorModeStyles = (
  colorMode: TColorMode,
  config?: ColorModeConfig,
) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!colorMode) return;

  const mode = colorMode === "system" ? getSystemMode() : colorMode;
  const head = document.head ?? document.getElementsByTagName("head")[0];
  const css = buildColorModeCss(mode, config);

  // Reuse the node (possibly created by the blocking script) instead of
  // removing/re-adding it: no gap without styles, no flicker.
  let style = head.querySelector<HTMLStyleElement>(
    `style[title="${STYLE_TITLE}"]`,
  );
  if (!style) {
    style = document.createElement("style");
    style.title = STYLE_TITLE;
    head.appendChild(style);
  }
  if (style.textContent !== css) style.textContent = css;
};

export const applyToDocument = (
  resolved: ResolvedMode,
  config?: ColorModeConfig,
  suppressTransitions?: boolean,
) => {
  if (suppressTransitions && typeof document !== "undefined") {
    const style = document.createElement("style");
    style.setAttribute("data-transition-suppress", "");
    style.textContent =
      "*,*::before,*::after{transition:none!important;animation:none!important;}";
    document.head.appendChild(style);
    // force a reflow so the rule applies before we mutate the theme
    void document.body?.offsetHeight;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => style.remove());
    });
  }
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved; // native UI: scrollbars, inputs, etc.
  writeColorModeStyles(resolved, config);
};

/** External stores (hydration-safe, multi-tab, OS-aware) */

export const subscribePreference = (cb: () => void) => {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
};

export const getPreference = (): TColorMode => {
  const v = storage.get();
  return isMode(v) ? v : "system";
};

export const subscribeSystem = (cb: () => void) => {
  const mq = window.matchMedia(DARK_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Blocking script: runs before first paint, no flash, no registry needed */

export const buildInitScript = (config?: ColorModeConfig) => {
  const css = {
    light: buildColorModeCss("light", config),
    dark: buildColorModeCss("dark", config),
  };
  return `(function(){try{
var d=document,e=d.documentElement,s=null;
try{s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)})}catch(_){}
var m=(s==="light"||s==="dark")?s:(matchMedia(${JSON.stringify(DARK_QUERY)}).matches?"dark":"light");
var css=${JSON.stringify(css)};
e.setAttribute("data-theme",m);e.style.colorScheme=m;
var t=d.querySelector('style[title="${STYLE_TITLE}"]');
if(!t){t=d.createElement("style");t.title="${STYLE_TITLE}";d.head.appendChild(t)}
t.textContent=css[m];
}catch(_){}})();`.replace(/</g, "\\u003c");
};
