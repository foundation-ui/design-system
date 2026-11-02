import type * as React from "react";
import type {
  IComponentShape,
  IComponentSize,
  IComponentStyling,
} from "../../types";

export enum AvataStatusEnum {
  Online = "online",
  Away = "away",
  Busy = "busy",
  Offline = "offline",
}

export type AvatarStatusType = "online" | "away" | "busy" | "offline";

export interface IAvatarProperties
  extends
    IComponentStyling,
    IComponentSize,
    IComponentShape,
    React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  status?: AvatarStatusType;
}

export interface IAvatarBadgeProperties extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}
