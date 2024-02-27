import React from "react";
import { Button, IButtonProperties } from "..//button";
import { IComponentStyling } from "../../../../../types";

export interface IToggleProperties
  extends React.ComponentPropsWithRef<"button">,
    IButtonProperties,
    IComponentStyling {
  defaultChecked?: boolean;
}

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
