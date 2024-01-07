import React from "react";
import { OverlayWrapper } from "./styles";
import { IComponentStyling } from "../../../../../types";

export interface IOverlayProperties
  extends IComponentStyling,
    React.ComponentPropsWithoutRef<"div"> {
  visible: boolean;
  closeOnInteract: boolean;
}

export const Overlay = (props: IOverlayProperties) => {
  const { raw, visible, closeOnInteract, onClick, ...restProps } = props;
  const [mounted, setMounted] = React.useState<boolean>(visible);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(event);
    if (closeOnInteract) setMounted(false);
  };

  return (
    <React.Fragment>
      {mounted && (
        <OverlayWrapper
          tabIndex={-1}
          onClick={handleClick}
          aria-hidden={true}
          data-raw={Boolean(raw)}
          {...restProps}
        />
      )}
    </React.Fragment>
  );
};
