import { GetTokenBase, js_design_tokens } from "@bsw/ds-tokens";
import { TokenTypesEnum } from "../../../../types";

export const lightTheme = {
  colors: {
    body: {
      base: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-white",
      }),
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
      contrast: GetTokenBase({
        source: js_design_tokens,
        token_category: TokenTypesEnum.Color,
        query: "mono-darker",
      }),
    },
  },
};
