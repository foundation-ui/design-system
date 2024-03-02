import { GetColorTokenBase, GetTokenFromSource } from "../services/get-token";
import { default as js_design_tokens } from "../assets/js/bsw_ds_tokens";
import { TokenTypesEnum } from "../../../../types";

export const darkTheme = {
  colors: {
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
