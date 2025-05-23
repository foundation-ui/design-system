"use client";

import React from "react";
import { Button, IButtonProperties } from "../button";

export interface IToggleProperties extends IButtonProperties {
  defaultChecked?: boolean;
}

/**
 * Toggle are button that can be switched on or off.
 *
 * **Best practices:**
 *
 * - Define the checked state of toggles with different variants, labels.
 * - The interaction must have predictable behavior.
 *
 * @param {IToggleProperties} props - The props for the Toggle component.
 * @param {boolean} props.defaultChecked - The initial checked state of the toggle. Defaults to false.
 * @param {ReactNode} props.children - The content to be rendered inside the toggle button.
 * @returns {ReactElement} The Toggle component.
 */
export const Toggle = (props: IToggleProperties) => {
  const { defaultChecked, onClick, disabled, children, ...restProps } = props;
  const [checked, setChecked] = React.useState<boolean>(
    defaultChecked ?? false
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    if (!disabled) setChecked((prevChecked) => !prevChecked);
  };

  React.useEffect(() => {
    if (defaultChecked !== undefined) {
      setChecked(Boolean(defaultChecked));
    }
  }, [defaultChecked]);

  return (
    <Button
      role="switch"
      onClick={handleClick}
      value={String(checked)}
      aria-checked={checked}
      data-checked={Boolean(checked)}
      data-disabled={Boolean(disabled)}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </Button>
  );
};
Toggle.displayName = "Toggle";
