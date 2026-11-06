import type { ProviderRegistryMetadata } from "@chambellan/contracts";

const clientProviderSource = `"use client";

import React from "react";

import { ColorModeProvider, js_design_tokens } from "@usefui/tokens";

import {
  generateColorClasses,
  generateCSSVariables,
  generateDimensionClasses,
  generateFontSizesClasses,
  generateLayoutClasses,
  generateOpacityClasses,
  generateSizeClasses,
} from "@usefui/core";

import { createGlobalStyle } from "styled-components";
import { ResetGlobalStyles, TypographyGlobalStyles } from "@usefui/components";

const { design_tokens } = js_design_tokens;

const cssLayoutClasses = generateLayoutClasses();
const cssWidthHeightClasses = generateDimensionClasses();
const cssSizeClasses = generateSizeClasses(design_tokens.measurement);
const cssFSClasses = generateFontSizesClasses(design_tokens.fontsize);
const cssOpacityClasses = generateOpacityClasses(design_tokens.opacity);
const cssColorClasses = generateColorClasses(design_tokens.color);

const cssVariables = generateCSSVariables({
  name: js_design_tokens.name,
  design_tokens: design_tokens,
});

const CSSRoot = createGlobalStyle\`
	:root {
		${"${cssVariables.color}"}
		${"${cssVariables.alpha}"}
		${"${cssVariables.tint}"}
		${"${cssVariables.shade}"}
		${"${cssVariables.fontsize}"}
		${"${cssVariables.measurement}"}
		${"${cssVariables.depth}"}
		${"${cssVariables.opacity}"}

		${"${cssSizeClasses}"}
		${"${cssFSClasses}"}
		${"${cssOpacityClasses}"}
		${"${cssColorClasses}"}
		${"${cssLayoutClasses}"}
    ${"${cssWidthHeightClasses}"}

    * {
      color: var(--font-color);
    }
    body {
      background-color: var(--body-color);
    }
	}
\`;

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
}`;

export const ClientProviderMeta: ProviderRegistryMetadata = {
  kind: "provider",
  name: "ClientProvider",
  title: "ClientProvider",
  description:
    "Demo ClientProvider that distributes the Design Tokens library as global CSS variables and utility classes. @usefui/styles no longer ships a CSSRoot export — build it from @usefui/core generators as shown.",
  module: "@usefui/tokens",
  code: clientProviderSource,
  properties: [
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
    },
  ],
  notes: [
    {
      kind: "note",
      title: "How it works",
      description:
        "ClientProvider wraps children in ColorModeProvider and injects ResetGlobalStyles, TypographyGlobalStyles, and a CSSRoot global style that emits the CSS variables and utility classes generated from the js_design_tokens library. CSSRoot must be defined in your app: @usefui/components only exports ResetGlobalStyles and TypographyGlobalStyles.",
    },
  ],
};
