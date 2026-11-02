"use client";

import React from "react";

import { BannerWrapper } from "./styles";

import { ComponentShapeEnum, ComponentVariantEnum } from "../../../../types";
import type { IBannerProperties } from "./types";

/**
 * Banners are used to convey rich data or states to the users.
 *
 * **Best practices:**
 *
 * - Define the hierarchy of Banners with different variants.
 * - Banner label must convey short and understandable information.
 *
 * @param {IBannerProperties} props - The props for the Banner component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {TComponentShape} props.shape - The shape of the component. Defaults to `smooth`.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to "small".
 * @param {string} props.variant - The style definition used by the component.
 * @param {boolean} props.emphasis - Emphasis change the style definition used by the component.
 * @param {ReactNode} props.children - The content to be rendered inside the Banner.
 * @returns {ReactElement} The Banner component.
 */
export const Banner = (props: IBannerProperties) => {
  const {
    raw = false,
    emphasis = false,
    variant = ComponentVariantEnum.Primary,
    shape = ComponentShapeEnum.Smooth,
    children,
    ...restProps
  } = props;

  return (
    <BannerWrapper
      data-raw={raw}
      data-variant={variant}
      data-shape={shape}
      data-emphasis={emphasis}
      {...restProps}
    >
      {children}
    </BannerWrapper>
  );
};

Banner.displayName = "Banner";
