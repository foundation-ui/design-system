import React from "react";
import ReactDOM from "react-dom";

export interface IPortalProperties {
  container: string;
  children?: React.ReactNode;
}

/**
 * Portal are used to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
 *
 * @param {IPortalProperties} props - The props for the Portal component.
 * @param {string} props.container - The ID of the DOM element to render the portal into.
 * @param {ReactNode} props.children - The content to be rendered inside the portal.
 * @returns {ReactElement} The Portal component.
 */
export const Portal = (props: IPortalProperties) => {
  const { container, children } = props;

  const [hasMounted, setHasMounted] = React.useState<boolean>(false);
  const PortalRoot = document?.querySelector(`#${container}`) ?? null;

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted || !PortalRoot) return null;
  return ReactDOM.createPortal(children, PortalRoot);
};
Portal.displayName = "Portal";
