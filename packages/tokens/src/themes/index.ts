import { mono_theme_base } from "./base/mono";
import { mono_theme_colors } from "./colors/mono";
import { default_theme_colors } from "./colors/default";

const light = {
  colors: {
    ...mono_theme_base.light,
    ...default_theme_colors,
  },
};
const dark = {
  colors: {
    ...mono_theme_base.dark,
    ...default_theme_colors,
  },
};

const light_mono = {
  colors: {
    ...mono_theme_base.light,
    ...mono_theme_colors.light,
  },
};
const dark_mono = {
  colors: {
    ...mono_theme_base.dark,
    ...mono_theme_colors.dark,
  },
};

export const design_system_themes = {
  light,
  dark,
  light_mono,
  dark_mono,
};
