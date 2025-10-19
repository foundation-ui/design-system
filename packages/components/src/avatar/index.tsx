"use client";

import React from "react";
import { AvatarWrapper, StatusWrapper } from "./styles";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
} from "../../../../types";

export enum AvataStatusEnum {
  Online = "online",
  Away = "away",
  Busy = "busy",
  Offline = "offline",
}
export interface IAvatarProperties
  extends IComponentStyling,
    IComponentSize,
    React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  status?: "online" | "away" | "busy" | "offline";
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
export const Avatar = (props: IAvatarProperties) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    status,
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
      aria-label={props["aria-label"] ?? `${sizeLabel}-user-avatar`}
      {...restProps}
    >
      {!children && src && (
        <img
          aria-label={`${sizeLabel}-user-avatar-image`}
          alt={alt ?? `${sizeLabel}-user-avatar-image`}
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
Avatar.displayName = "Avatar";
