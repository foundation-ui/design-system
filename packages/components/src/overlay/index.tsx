import React from "react";
import { OverlayWrapper } from "./styles";
import { IComponentStyling } from "../../../../types";

export interface IOverlayProperties
  extends IComponentStyling,
    React.ComponentProps<"div"> {
  visible?: boolean;
  closeOnInteract?: boolean;
}

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
 * @param {boolean} props.visible - Whether the component is visible or not.
 * @param {boolean} props.closeOnInteract - Whether the overlay should be closed when the user interacts with it.
 * @param {function} props.onClick - The callback function to be invoked when the overlay is clicked.
 * @returns {ReactElement} The Overlay component.
 */
export const Overlay = (props: IOverlayProperties) => {
  const { raw, visible, closeOnInteract, onClick, ...restProps } = props;
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
          {...restProps}
        />
      )}
    </React.Fragment>
  );
};
Overlay.displayName = "Button";
