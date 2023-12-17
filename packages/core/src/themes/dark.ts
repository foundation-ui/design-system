import { GetTokenBase, js_design_tokens } from "@bsw/ds-tokens";
import { TokenTypesEnum } from "../../../../types";

export const darkTheme = {
  colors: {
    body: {
      base: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-darkest",
      }),
      alpha: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-darker",
      }).alpha,
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
      alpha: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-light",
      }).alpha,
      contrast: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      }),
    },
  },
};
