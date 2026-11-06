import React from "react";

import type { IComponentShape, IComponentSize } from "../../types";
import type { IImageProperties } from "../../image/types";

export interface CardGridProps
  extends React.ComponentProps<"div">, IComponentSize {}

export interface CardProps
  extends IComponentSize, IComponentShape, React.ComponentProps<"div"> {}

export type CardImageProps = IImageProperties;
