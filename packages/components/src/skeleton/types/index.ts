import type * as React from "react";
import type { IComponentShape, IComponentSize } from "../../../../../types";

export interface SkeletonProperties
  extends IComponentSize, IComponentShape, React.ComponentPropsWithRef<"div"> {}
