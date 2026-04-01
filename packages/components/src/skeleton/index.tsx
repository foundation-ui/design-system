"use client";

import React from "react";
import { SkeletonLoader } from "./styles";

import {
  ComponentShapeEnum,
  ComponentSizeEnum,
  type IComponentShape,
  type IComponentSize,
} from "../../../../types";

export interface SkeletonProperties
  extends
    IComponentSize,
    IComponentShape,
    React.ComponentPropsWithRef<"span"> {}

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
    shape = ComponentShapeEnum.Smooth,
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
