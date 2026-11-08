"use client";

import React from "react";

import { createGlobalStyle } from "styled-components";
import { ColorModeProvider, js_design_tokens } from "../packages/tokens";

import {
  ResetGlobalStyles,
  TypographyGlobalStyles,
} from "../packages/components";

import {
  generateColorClasses,
  generateCSSVariables,
  generateDimensionClasses,
  generateFontSizesClasses,
  generateLayoutClasses,
  generateOpacityClasses,
  generateSizeClasses,
} from "../packages/core";

const design_tokens = js_design_tokens;

const cssLayoutClasses = generateLayoutClasses();
const cssWidthHeightClasses = generateDimensionClasses();
const cssSizeClasses = generateSizeClasses(design_tokens.measurement);
const cssFSClasses = generateFontSizesClasses(design_tokens.fontsize);
const cssOpacityClasses = generateOpacityClasses(design_tokens.opacity);
const cssColorClasses = generateColorClasses(design_tokens.color);

const cssVariables = generateCSSVariables(design_tokens);

const CSSRoot = createGlobalStyle`
	:root {
		${cssVariables.color}
		${cssVariables.alpha}
		${cssVariables.tint}
		${cssVariables.shade}
		${cssVariables.fontsize}
		${cssVariables.measurement}
		${cssVariables.depth}
		${cssVariables.opacity}

		${cssSizeClasses}
		${cssFSClasses}
		${cssOpacityClasses}
		${cssColorClasses}
		${cssLayoutClasses}
    ${cssWidthHeightClasses}

    * {
      color: var(--font-color);
    }
    body {
      background-color: var(--body-color);
    }
	}
`;

export function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ColorModeProvider>
      <ResetGlobalStyles />
      <TypographyGlobalStyles />
      <CSSRoot />

      {children}
    </ColorModeProvider>
  );
}
