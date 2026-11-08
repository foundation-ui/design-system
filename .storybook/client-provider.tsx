"use client";

import React from "react";

import { createGlobalStyle } from "styled-components";
import { js_design_tokens } from "../packages/tokens";

import {
  ResetGlobalStyles,
  TypographyGlobalStyles,
  ColorModeProvider,
} from "../packages/components";

import { generateCSSClasses, generateCSSVariables } from "../packages/core";

const design_tokens = js_design_tokens;

const cssVariables = generateCSSVariables(design_tokens);
const cssClasses = generateCSSClasses(design_tokens);

const CSSRoot = createGlobalStyle`
	:root {
		${Object.values(cssVariables).flat()}
		${cssClasses}

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
