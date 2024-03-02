import { GetTokenBase, GetTokenFromSource } from "../services/get-token";
import { default as js_design_tokens } from "../assets/js/bsw_ds_tokens";
import { TokenTypesEnum } from "../../../../types";

export const darkTheme = {
  colors: {
    body: {
      base: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-dark",
      }),
      alpha: GetTokenFromSource({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-dark",
      })?.alpha,
      contrast: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-darkest",
      }),
    },
    text: {
      base: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      }),
      alpha: GetTokenFromSource({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      })?.alpha,
      contrast: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-whitest",
      }),
    },
  },
};
