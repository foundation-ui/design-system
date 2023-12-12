import { createGlobalStyle } from "styled-components";
import { generateCSSVariables } from "@bsw/ds-foundations";
import { js_design_tokens } from "@bsw/ds-tokens";

const cssVariables = generateCSSVariables(js_design_tokens);
export const CSSRoot = createGlobalStyle`
	:root {
		${cssVariables.color}
		${cssVariables.alpha}
		${cssVariables.tint}
		${cssVariables.shade}
		${cssVariables.fontsize}
		${cssVariables.measurement}
	}
`;
