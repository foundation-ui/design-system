import { createGlobalStyle } from "styled-components";
import { js_design_tokens } from "@foundation-ui/tokens";
import { generateCSSVariables } from "../generators/css-variables";

const cssVariables = generateCSSVariables(js_design_tokens);
export const CSSRoot = createGlobalStyle`
	:root {
		${cssVariables.color}
		${cssVariables.alpha}
		${cssVariables.tint}
		${cssVariables.shade}
		${cssVariables.fontsize}
		${cssVariables.measurement}
		${cssVariables.depth}
		${cssVariables.opacity}

		--breakpoint-mobile: 375px;
		--breakpoint-mobile-large: 425px;
		--breakpoint-tablet-lmall: 672px;
		--breakpoint-tablet: 768px;
		--breakpoint-tablet-landscape: 1024px;
		--breakpoint-desktop: 1440px;
		--breakpoint-deskto-lLarge: 1589px;
	}
`;
