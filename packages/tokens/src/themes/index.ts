import { mono_theme_base } from "./base/mono";
import { mono_theme_colors } from "./colors/mono";
import { default_theme_colors } from "./colors/default";

const light = {
  colors: {
    ...mono_theme_base.light,
  },
};
const dark = {
  colors: {
    ...mono_theme_base.dark,
  },
};

export const design_system_themes = {
  light,
  dark,
  ...default_theme_colors,
};
