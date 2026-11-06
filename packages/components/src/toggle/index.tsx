"use client";

import React from "react";

import { Button } from "../button";
import type { IToggleProperties } from "./types";

/**
 * Toggle is a button that can be switched on or off.
 *
 * Supports uncontrolled (`defaultChecked`) and controlled (`checked`) usage.
 *
 * **Best practices:**
 *
 * - Define the checked state of toggles with different variants, labels.
 * - The interaction must have predictable behavior.
 *
 * @param {IToggleProperties} props - The props for the Toggle component.
 * @param {boolean} props.checked - Controlled checked state.
 * @param {boolean} props.defaultChecked - Initial state when uncontrolled. Defaults to false.
 * @param {(checked: boolean) => void} props.onCheckedChange - Called with the next state.
 * @param {ReactNode} props.children - Content rendered inside the toggle button.
 * @returns {ReactElement} The Toggle component.
 */
export const Toggle = React.forwardRef<HTMLButtonElement, IToggleProperties>(
  (props, ref) => {
    const {
      checked: checkedProperty,
      defaultChecked = false,
      onCheckedChange,
      onClick,
      disabled,
      name,
      value = "on",
      children,
      ...restProps
    } = props;

    const isControlled = checkedProperty !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] =
      React.useState<boolean>(Boolean(defaultChecked));
    const checked = isControlled
      ? Boolean(checkedProperty)
      : uncontrolledChecked;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      onClick?.(event);
      if (event.defaultPrevented) return;

      const next = !checked;
      if (!isControlled) setUncontrolledChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <>
        <Button
          {...restProps}
          ref={ref}
          type="button"
          aria-pressed={checked}
          data-checked={checked}
          data-disabled={Boolean(disabled)}
          disabled={disabled}
          onClick={handleClick}
        >
          {children}
        </Button>
        {name && checked && (
          <input type="hidden" name={name} value={value} disabled={disabled} />
        )}
      </>
    );
  },
);
Toggle.displayName = "Toggle";
