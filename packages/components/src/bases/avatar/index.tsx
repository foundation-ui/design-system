import React from "react";
import { AvatarWrapper, StatusWrapper } from "./styles";
import { IComponentStyling } from "../../../../../types";

export enum AvataSizeEnum {
  Small = "small",
  Medium = "medium",
  Large = "large",
}
export enum AvataStatusEnum {
  Online = "online",
  Away = "away",
  Busy = "busy",
  Offline = "offline",
}

export type TAvatarSize =
  | AvataSizeEnum.Small
  | AvataSizeEnum.Medium
  | AvataSizeEnum.Large;
export type TAvatarStatus =
  | AvataStatusEnum.Offline
  | AvataStatusEnum.Busy
  | AvataStatusEnum.Away
  | AvataStatusEnum.Online;

export interface IAvatarProperties
  extends IComponentStyling,
    React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: TAvatarSize;
  status?: TAvatarStatus;
}

export const Avatar = (props: IAvatarProperties) => {
  const { raw, size, status, src, alt, children, ...restProps } = props;

  return (
    <AvatarWrapper
      data-raw={raw}
      data-size={size || AvataSizeEnum.Small}
      data-status={status || AvataStatusEnum.Offline}
      aria-label={props["aria-label"] || `${size}-user-avatar`}
      {...restProps}
    >
      {!children && src && (
        <img alt={alt || `${size}-user-avatar-image`} src={src} />
      )}

      {children}
      {status && (
        <StatusWrapper
          role="img"
          aria-label={`${size}-user-avatar-status`}
          aria-labelledby="title desc"
          data-status={status || AvataStatusEnum.Offline}
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
Avatar.defaultProps = {
  raw: false,
};
