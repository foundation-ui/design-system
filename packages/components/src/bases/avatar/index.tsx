import React from "react";
import { Wrapper, StatusWrapper } from "./styles";

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
  extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: TAvatarSize;
  status?: TAvatarStatus;
}

export const Avatar = (props: IAvatarProperties) => {
  const { size, status, src, alt, ...restProps } = props;

  return (
    <Wrapper
      data-size={size || AvataSizeEnum.Small}
      aria-label={props["aria-label"] || `${size}-user-avatar`}
      {...restProps}
    >
      {src && <img alt={alt || `${size}-user-avatar-image`} src={src} />}

      {status && (
        <StatusWrapper
          role="img"
          aria-label="user-avatar-status"
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
    </Wrapper>
  );
};
