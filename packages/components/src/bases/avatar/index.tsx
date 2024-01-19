import React from "react";
import { AvatarWrapper, StatusWrapper } from "./styles";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
} from "../../../../../types";

export enum AvataStatusEnum {
  Online = "online",
  Away = "away",
  Busy = "busy",
  Offline = "offline",
}
export type TAvatarStatus =
  | AvataStatusEnum.Offline
  | AvataStatusEnum.Busy
  | AvataStatusEnum.Away
  | AvataStatusEnum.Online;

export interface IAvatarProperties
  extends IComponentStyling,
    IComponentSize,
    React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  status?: TAvatarStatus;
}

export const Avatar = (props: IAvatarProperties) => {
  const { raw, sizing, status, src, alt, children, ...restProps } = props;
  const sizeLabel = sizing || ComponentSizeEnum.Medium;

  return (
    <AvatarWrapper
      data-raw={Boolean(raw)}
      data-size={sizing || ComponentSizeEnum.Medium}
      data-status={status || AvataStatusEnum.Offline}
      aria-label={props["aria-label"] || `${sizeLabel}-user-avatar`}
      {...restProps}
    >
      {!children && src && (
        <img
          aria-label={`${sizeLabel}-user-avatar-image`}
          alt={alt || `${sizeLabel}-user-avatar-image`}
          src={src}
        />
      )}

      {children}
      {status && (
        <StatusWrapper
          role="img"
          aria-label={`${sizing}-user-avatar-status`}
          aria-labelledby="title desc"
          data-status={status}
          height="16"
          width="16"
        >
          <title>{"Activity status"}</title>
          <desc>{status}</desc>
          <circle role="presentation" cx="8" cy="8" r="6" />
        </StatusWrapper>
      )}
    </AvatarWrapper>
  );
};
