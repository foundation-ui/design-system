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
