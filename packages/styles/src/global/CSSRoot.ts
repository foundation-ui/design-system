import { createGlobalStyle } from "styled-components";
import { js_design_tokens } from "@foundation-ui/tokens";
import {
  generateCSSVariables,
  generateSizeClasses,
  generateFontSizesClasses,
  generateLayoutClasses,
  generateOpacityClasses,
} from "@foundation-ui/core";

const cssVariables = generateCSSVariables(js_design_tokens);
const cssLayoutClasses = generateLayoutClasses();
const cssSizeClasses = generateSizeClasses(
  js_design_tokens.design_tokens.measurement
);
const cssFSClasses = generateFontSizesClasses(
  js_design_tokens.design_tokens.fontsize
);
const cssOpacityClasses = generateOpacityClasses(
  js_design_tokens.design_tokens.opacity
);

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
		--breakpoint-tablet-small: 672px;
		--breakpoint-tablet: 768px;
		--breakpoint-tablet-landscape: 1024px;
		--breakpoint-desktop: 1440px;
		--breakpoint-deskto-lLarge: 1589px;

		${cssSizeClasses}
		${cssFSClasses}
		${cssOpacityClasses}
		${cssLayoutClasses}
	}
`;
