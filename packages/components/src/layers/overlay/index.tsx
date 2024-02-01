import React from "react";
import { OverlayWrapper } from "./styles";
import { IComponentStyling } from "../../../../../types";

export interface IOverlayProperties
  extends IComponentStyling,
    React.ComponentProps<"div"> {
  visible?: boolean;
  defaultVisible?: boolean;
  closeOnInteract: boolean;
}

export const Overlay = (props: IOverlayProperties) => {
  const {
    raw,
    visible,
    defaultVisible,
    closeOnInteract,
    onClick,
    ...restProps
  } = props;
  const [mounted, setMounted] = React.useState<boolean>(Boolean(visible));

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(event);
    if (closeOnInteract) setMounted(false);
  };

  React.useLayoutEffect(() => {
    if (defaultVisible) setMounted(true);
  }, []);

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
          {...restProps}
        />
      )}
    </React.Fragment>
  );
};
