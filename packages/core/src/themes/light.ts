import { GetTokenBase, GetToken, js_design_tokens } from "@bsw/ds-tokens";
import { themeBase } from "./base";
import { TokenTypesEnum } from "../../../../types";

export const lightTheme = {
  breakPoints: themeBase.breakpoints,
  fontWeights: themeBase.fontWeights,
  colors: {
    body: {
      base: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      }),
      alpha: GetToken({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      })?.alpha,
      contrast: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      }),
    },
    text: {
      base: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-dark",
      }),
      alpha: GetToken({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-dark",
      })?.alpha,
      contrast: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-darker",
      }),
    },
  },
};
