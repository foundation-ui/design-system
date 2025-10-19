"use client";

import React from "react";
import { SkeletonLoader } from "./styles";

import {
  ComponentSizeEnum,
  type IComponentSize,
  type TComponentShape,
} from "../../../../types";

export interface SkeletonProperties
  extends IComponentSize,
    React.ComponentPropsWithRef<"span"> {
  shape?: TComponentShape;
}

/**
 * Skeletons are used to convoy a loading state information.
 *
 * @param {IButtonProperties} props - The props for the Skeleton component.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {TComponentShape} props.shape - The size of the component. Defaults to `smooth`.
 * @returns {ReactElement} The Skeleton component.
 */
export const Skeleton = (props: SkeletonProperties): React.ReactElement => {
  const {
    sizing = ComponentSizeEnum.Medium,
    shape = "smooth",
    ...restProps
  } = props;

  return (
    <SkeletonLoader
      data-size={sizing}
      data-shape={shape}
      tabIndex={0}
      {...restProps}
    />
  );
};

Skeleton.displayName = "Skeleton";
