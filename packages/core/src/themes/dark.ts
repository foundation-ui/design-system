import { GetTokenBase, js_design_tokens } from "@bsw/ds-tokens";
import { themeBase } from "./base";
import { TokenTypesEnum } from "../../../../types";

export const darkTheme = {
  breakPoints: themeBase.breakpoints,
  fontWeights: themeBase.fontWeights,
  colors: {
    body: {
      base: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-darkest",
      }),
      contrast: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-darker",
      }),
    },
    text: {
      base: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-light",
      }),
      contrast: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      }),
    },
  },
};
