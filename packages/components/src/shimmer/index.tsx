"use client";

import React from "react";
import { TextShimmerWrapper } from "./styles";
import { IComponentStyling } from "../../../../types";

const DEFAULT_DURATION = 2;
const DEFAULT_SPREAD = 200;
const DEFAULT_SHIMMER_COLOR = "var(--font-color-alpha-60)";
const DEFAULT_BASE_COLOR = "var(--font-color-alpha-30)";

export interface ITextShimmerProperties
  extends IComponentStyling, React.HTMLAttributes<HTMLSpanElement> {
  duration?: number;
  spread?: number;
  shimmerColor?: string;
  baseColor?: string;
}

/**
 * Shimmer applies an animated shimmer gradient effect to inline text content.
 *
 * **Best practices:**
 *
 * - Use to indicate loading states for text content.
 * - Prefer CSS custom properties for `shimmerColor` and `baseColor` to stay consistent with your design tokens.
 * - Avoid using on large blocks of text; favour short labels or headings.
 *
 * @param {ITextShimmerProperties} props - The props for the Shimmer component.
 * @param {ReactNode} props.children - The text content to apply the shimmer effect to.
 * @param {boolean} props.raw - Whether the component is unstyled.
 * @param {number} props.duration - Animation cycle duration in seconds. Defaults to 2.
 * @param {number} props.spread - Gradient spread width as a percentage. Defaults to 200.
 * @param {string} props.shimmerColor - Highlight color of the shimmer. Defaults to `--font-color-alpha-60`.
 * @param {string} props.baseColor - Base text gradient color. Defaults to `--font-color-alpha-30`.
 * @returns {ReactElement} The Shimmer component.
 */
export const Shimmer = (props: ITextShimmerProperties) => {
  const {
    children,
    raw,
    duration = DEFAULT_DURATION,
    spread = DEFAULT_SPREAD,
    shimmerColor = DEFAULT_SHIMMER_COLOR,
    baseColor = DEFAULT_BASE_COLOR,
    ...restProps
  } = props;

  return (
    <TextShimmerWrapper
      data-raw={Boolean(raw)}
      data-duration={duration}
      data-spread={spread}
      data-shimmer-color={shimmerColor}
      data-base-color={baseColor}
      aria-label={restProps["aria-label"] ?? "shimmer-text"}
      {...restProps}
    >
      {children}
    </TextShimmerWrapper>
  );
};

Shimmer.displayName = "Shimmer";
