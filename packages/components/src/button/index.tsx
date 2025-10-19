"use client";

import React from "react";

import { ButtonWrapper, ButtonMaskElement, ButtonOverlay } from "./styles";
import {
  IComponentStyling,
  ComponentSizeEnum,
  IComponentSize,
  ComponentVariantEnum,
  TComponentVariant,
  TComponentShape,
} from "../../../../types";

export interface IButtonProperties
  extends IComponentStyling,
    IComponentSize,
    React.ComponentPropsWithRef<"button"> {
  rawicon?: boolean;
  variant?: TComponentVariant | "danger" | "warning";
  shape?: TComponentShape;
  animation?: "reflective";
}

/**
 * Buttons are used to initialize an action.
 *
 * **Best practices:**
 *
 * - Define the hierarchy of buttons with different variants.
 * - Button label must be short and understandable.
 *
 * @param {IButtonProperties} props - The props for the Button component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {boolean} props.rawicon - Define whether the component is styles its svg children.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to "medium".
 * @param {TComponentShape} props.shape - The size of the component. Defaults to `smooth`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {string} props.animation - The animation that comes with the variant.
 * @param {ReactNode} props.children - The content to be rendered inside the button.
 * @returns {ReactElement} The Button component.
 */
export const Button = React.forwardRef<HTMLButtonElement, IButtonProperties>(
  (props, forwardedRef): React.ReactElement => {
    const {
      name,
      variant = ComponentVariantEnum.Primary,
      sizing = ComponentSizeEnum.Medium,
      shape = "smooth",
      animation,
      raw,
      rawicon,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      children,
      ...restProps
    } = props;

    const defaultName = "button";
    const ariaLabel = `${name ?? defaultName}-action`;
    const disabledState = props.disabled ?? false;
    const buttonType = props.type ?? "button";

    const buttonDescription = `${ariaLabel}:${buttonType}`;
    const buttonStateDescription = `disabled:${disabledState}`;
    const ButtonFullDesc = `${buttonDescription}/${buttonStateDescription}`;

    const isReflective = animation === "reflective" && variant !== "ghost";

    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = React.useState(false);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onMouseMove) onMouseMove(e);
        if (!isReflective) return;

        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      },
      []
    );
    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onMouseEnter) onMouseEnter(e);
        if (!isReflective) return;

        setIsHovering(true);
      },
      []
    );
    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onMouseLeave) onMouseLeave(e);
        if (!isReflective) return;

        setIsHovering(false);
      },
      []
    );

    return (
      <ButtonWrapper
        ref={forwardedRef}
        role="button"
        type={buttonType}
        name={name ?? defaultName}
        aria-label={ariaLabel}
        aria-description={ButtonFullDesc}
        aria-disabled={disabledState}
        data-variant={variant}
        data-size={sizing}
        data-shape={shape}
        data-animation={animation}
        data-raw={Boolean(raw)}
        data-rawicon={Boolean(rawicon)}
        tabIndex={0}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...restProps}
      >
        {isReflective && (
          <ButtonOverlay $isHovering={isHovering} data-shape={shape}>
            <ButtonMaskElement
              $mouseX={position.x}
              $mouseY={position.y}
              data-shape={shape}
            />
          </ButtonOverlay>
        )}
        {children}
      </ButtonWrapper>
    );
  }
);
Button.displayName = "Button";
