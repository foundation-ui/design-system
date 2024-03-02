import {
  GetColorTokenBase,
  GetTokenFromSource,
} from "../../services/get-token";
import { default as js_design_tokens } from "../../assets/js/ds-tokens";
import { TokenTypesEnum } from "../../../../../types";

export const mono_theme_colors = {
  primary: {
    base: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-dark",
    }),
    alpha: GetTokenFromSource({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-dark",
    })?.alpha,
    contrast: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-darkest",
    }),
  },
  secondary: {
    base: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-dark",
    }),
    alpha: GetTokenFromSource({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-dark",
    })?.alpha,
    contrast: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-darkest",
    }),
  },
  tertiary: {
    base: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-dark",
    }),
    alpha: GetTokenFromSource({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-dark",
    })?.alpha,
    contrast: GetColorTokenBase({
      source: js_design_tokens,
      token_category: TokenTypesEnum.Color,
      query: "mono-darkest",
    }),
  },
};
