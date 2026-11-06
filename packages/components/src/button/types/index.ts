import type * as React from "react";
import type {
  IComponentAnimation,
  IComponentShape,
  IComponentSize,
  IComponentStyling,
  TComponentVariant,
  TComponentVariantExtended,
} from "../../types";
import type { SoundName } from "@usefui/hooks";

export interface IButtonProperties
  extends
    IComponentStyling,
    IComponentShape,
    IComponentSize,
    IComponentAnimation,
    React.ComponentPropsWithRef<"button"> {
  rawicon?: boolean;
  variant?: TComponentVariant | TComponentVariantExtended | "link" | "accent";
  sound?: SoundName;
}

export interface OverlayProps {
  $isHovering: boolean;
}

export interface MaskProps {
  $mouseX: number;
  $mouseY: number;
}
