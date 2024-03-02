import {
  GetColorTokenBase,
  GetTokenFromSource,
} from "../../services/get-token";
import { default as js_design_tokens } from "../../assets/js/ds-tokens";
import { TokenTypesEnum } from "../../../../../types";

export const mono_theme_base = {
  light: {
    body: {
      base: GetColorTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      }),
      alpha: GetTokenFromSource({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      })?.alpha,
      contrast: GetColorTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      }),
    },
    text: {
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
        query: "mono-dark",
      }),
    },
  },
  dark: {
    body: {
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
    text: {
      base: GetColorTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      }),
      alpha: GetTokenFromSource({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      })?.alpha,
      contrast: GetColorTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-whitest",
      }),
    },
  },
};
