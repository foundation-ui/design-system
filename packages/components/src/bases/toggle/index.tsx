import React from "react";
import { Button, IButtonProperties } from "..//button";
import { IComponentStyling } from "../../../../../types";

export interface IToggleProperties
  extends React.ComponentPropsWithRef<"button">,
    IButtonProperties,
    IComponentStyling {
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
export const Toggle = React.forwardRef<HTMLButtonElement, IToggleProperties>(
  (props, forwardedRef) => {
    const { defaultChecked, onClick, disabled, children, ...restProps } = props;
    const [checked, setChecked] = React.useState<boolean>(
      defaultChecked || false
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(event);
      if (!disabled) setChecked(!checked);
    };

    React.useEffect(() => {
      if (defaultChecked) setChecked(true);
    }, [defaultChecked]);

    return (
      <Button
        ref={forwardedRef}
        onClick={handleClick}
        value={String(checked)}
        data-checked={Boolean(checked)}
        data-disabled={Boolean(disabled)}
        {...restProps}
      >
        {children}
      </Button>
    );
  }
);
Toggle.displayName = "Toggle";
Toggle.defaultProps = {
  raw: false,
};
