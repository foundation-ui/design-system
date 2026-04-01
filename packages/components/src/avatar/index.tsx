"use client";

import React from "react";
import { AvatarWrapper, BadgeWrapper, StatusWrapper } from "./styles";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
  ComponentShapeEnum,
  IComponentShape,
} from "../../../../types";

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

export interface IAvatarComposition {
  Status: typeof AvatarStatus;
  Badge: typeof AvatarBadge;
}

/**
 * Avatar are used to represents a user or an entity on an interface.
 *
 * **Best practices:**
 *
 * - Use the appropriate size to match the context and the importance of the information.
 * - Always provide an `alt` attribute for accessibility when using an image.
 * - Indicate the user's activity status.
 *
 * @param {IAvatarProperties} props - The props for the Avatar component.
 * @param {boolean} props.raw - Whether the avatar is styled or not.
 * @param {ComponentSizeEnum} props.sizing - The size of the avatar. Defaults to "medium".
 * @param {string} props.status - The status of the user represented by the avatar.
 * @param {string} props.src - The source URL of the image to be displayed in the avatar.
 * @param {string} props.alt - The alternative text for the image in the avatar.
 * @param {ReactNode} props.children - The content to be rendered inside the avatar.
 * @returns {ReactElement} The Avatar component.
 */
const Avatar = (props: IAvatarProperties) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    status,
    shape = ComponentShapeEnum.Round,
    src,
    alt,
    children,
    ...restProps
  } = props;
  const sizeLabel = sizing ?? ComponentSizeEnum.Medium;

  return (
    <AvatarWrapper
      data-raw={Boolean(raw)}
      data-size={sizing}
      data-status={status}
      data-shape={shape}
      aria-label={props["aria-label"] ?? `${sizeLabel}-user-avatar`}
      {...restProps}
    >
      {src && (
        <img
          aria-label={`${sizeLabel}-user-avatar-image`}
          alt={alt ?? `${sizeLabel}-user-avatar-image`}
          src={src}
        />
      )}

      {children}
      {status && <Avatar.Status status={status} />}
    </AvatarWrapper>
  );
};
Avatar.displayName = "Avatar";

/**
 * Avatar Statuses are used to represents a user activity status on an interface.
 *
 * **Best practices:**
 *
 * - Use the appropriate status to match the context and the importance of the information.
 *
 * @param {string} props.status - The status of the user represented by the avatar.
 * @returns {ReactElement} The Avatar Status component.
 */
const AvatarStatus = (props: {
  status?: AvatarStatusType;
}): React.ReactElement => {
  const { status } = props;

  return (
    <StatusWrapper
      role="img"
      aria-label={`${status}-user-avatar-status`}
      aria-labelledby="title desc"
      data-status={status}
      height="12"
      width="12"
      {...props}
    >
      <title>{"Activity status"}</title>
      <desc>{status}</desc>
      <circle role="presentation" cx="6" cy="6" r="4" />
    </StatusWrapper>
  );
};
AvatarStatus.displayName = "Avatar.Status";

/**
 * Avatar Badges are used to represents an entity or an information related to the primary subject of the avatar.
 *
 * **Best practices:**
 *
 * - Use the appropriate imgage to display the context and the importance of the information.
 * - Always provide an `alt` attribute for accessibility when using an image.
 *
 * @param {IAvatarBadgeProperties} props - The props for the Avatar Badge component.
 * @param {string} props.src - The source URL of the image to be displayed in the avatar badge.
 * @param {string} props.alt - The alternative text for the image in the avatar badge.
 * @returns {ReactElement} The Avatar Badge component.
 */
const AvatarBadge = (props: IAvatarBadgeProperties): React.ReactElement => {
  const { src, alt, children } = props;
  return (
    <BadgeWrapper role="img" aria-label="user-avatar-badge-wrapper" {...props}>
      {src && !children && (
        <img
          aria-label="user-avatar-badge"
          alt={alt ?? "user-avatar-badge"}
          src={src}
        />
      )}
      {!src && children && children}
    </BadgeWrapper>
  );
};
AvatarBadge.displayName = "Avatar.Badge";

Avatar.Status = AvatarStatus;
Avatar.Badge = AvatarBadge;

export { Avatar, AvatarStatus };
