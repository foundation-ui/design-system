import type * as React from "react";
import type { IComponentShape, IComponentSize } from "../../../../../types";

export interface CardGridProps
  extends React.ComponentProps<"div">, IComponentSize {}

export interface CardProps
  extends IComponentShape, React.ComponentProps<"div"> {}
