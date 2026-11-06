"use client";

import React from "react";

import { StateCanvas } from "../state-canvas";
import { OverlayWrapper } from "./styles";

import type { IOverlayProperties } from "./types";

/**
 * Overlay are used to display content on top of the current layer.
 *
 * **Best practices:**
 *
 * - Use semantic HTML elements to structure the content of the overlay.
 * - Ensure that the overlay is visible and accessible to all users, including those using assistive technologies.
 * - Use keyboard shortcuts to provide an alternative way of interacting with the overlay.
 * - Ensure that the overlay is responsive and adapts to different screen sizes and orientations.
 *
 * @param {IOverlayProperties} props - The props for the Overlay component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {string} props.variant - The style definition used by the StateCanvas component.
 * @param {string} props.shape - The style definition used by the StateCanvas particles.
 * @param {string} props.background - The style definition used by the component.
 * @param {boolean} props.visible - Whether the component is visible or not.
 * @param {boolean} props.canvas - Whether the component uses StateCanvas on the background or not.
 * @param {string} props.particlesColor - The colors passed to StateCanvas that define the particles color.
 * @param {boolean} props.closeOnInteract - Whether the overlay should be closed when the user interacts with it.
 * @param {function} props.onClick - The callback function to be invoked when the overlay is clicked.
 * @returns {ReactElement} The Overlay component.
 */
export const Overlay = (props: IOverlayProperties) => {
  const {
    raw,
    visible,
    closeOnInteract,
    canvas,
    particlesColor,
    shape = "square",
    variant = "analysis",
    background = "noise",
    onClick,
    ...restProps
  } = props;
  const [mounted, setMounted] = React.useState<boolean>(Boolean(visible));

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(event);
    if (closeOnInteract) setMounted(false);
  };

  React.useEffect(() => {
    if (visible !== mounted) setMounted(Boolean(visible));
  }, [visible]);

  return (
    <React.Fragment>
      {mounted && (
        <OverlayWrapper
          tabIndex={-1}
          onClick={handleClick}
          aria-hidden={true}
          data-raw={Boolean(raw)}
          data-background={background}
          {...restProps}
        >
          {canvas && (
            <StateCanvas>
              <StateCanvas.Variant
                shape={shape}
                variant={variant}
                color={particlesColor}
              />
            </StateCanvas>
          )}
        </OverlayWrapper>
      )}
    </React.Fragment>
  );
};
Overlay.displayName = "Overlay";
