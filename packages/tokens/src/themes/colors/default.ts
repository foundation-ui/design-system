import {
  GetColorTokenBase,
  GetTokenFromSource,
} from "../../services/get-token";
import { default as js_design_tokens } from "../../assets/js/ds-tokens";
import { TokenTypesEnum } from "../../../../../types";

export const default_theme_colors = {
  primary: {
    base: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "orange",
    }),
    alpha: GetTokenFromSource({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "orange",
    })?.alpha,
    contrast: GetTokenFromSource({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "orange",
    })?.shade,
  },
  secondary: {
    base: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "blue",
    }),
    alpha: GetTokenFromSource({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "blue",
    })?.alpha,
    contrast: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "blue",
    })?.shade,
  },
  tertiary: {
    base: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "deep-blue",
    }),
    alpha: GetTokenFromSource({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "deep-blue",
    })?.alpha,
    contrast: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "deep-blue",
    })?.tint,
  },
};
