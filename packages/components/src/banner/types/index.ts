import type * as React from "react";
import type {
  IComponentShape,
  IComponentStyling,
  TComponentVariant,
  TComponentVariantExtended,
} from "../../../../../types";

export interface IBannerProperties
  extends IComponentStyling, IComponentShape, React.ComponentProps<"div"> {
  variant?: TComponentVariant | TComponentVariantExtended;
  emphasis?: boolean;
}
