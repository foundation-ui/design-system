import type * as React from "react";
import type {
  IComponentShape,
  IComponentSize,
  IComponentStyling,
  IComponentVariant,
} from "../../types";

export type ScrollContainerProps = {
  $height?: string;
  $width?: string;
  $thumbColor?: string;
  $trackColor?: string;
  $thumbHoverColor?: string;
};

export interface TextareaProps
  extends
    React.ComponentPropsWithRef<"textarea">,
    IComponentStyling,
    IComponentSize,
    IComponentShape,
    IComponentVariant {
  resizable?: boolean;
}
