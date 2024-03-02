import { mono_theme_base } from "./base/mono";
import { mono_theme_colors } from "./colors/mono";
import { contrast_theme_colors } from "./colors/contrast";

const light = {
  colors: {
    ...mono_theme_base.light,
    ...contrast_theme_colors,
  },
};
const dark = {
  colors: {
    ...mono_theme_base.dark,
    ...contrast_theme_colors,
  },
};
const light_mono = {
  colors: {
    ...mono_theme_base.light,
    ...mono_theme_colors,
  },
};
const dark_mono = {
  colors: {
    ...mono_theme_base.dark,
    ...mono_theme_colors,
  },
};
const contrast = {
  colors: {
    ...mono_theme_base.dark,
    ...contrast_theme_colors,
  },
};

export const design_system_themes = {
  light,
  dark,
  light_mono,
  dark_mono,
  contrast,
};
