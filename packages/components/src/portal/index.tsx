"use client";

import React from "react";
import { createPortal } from "react-dom";

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
  // Handle SSR in Next.js and Electron's renderer process
  if (typeof document === "undefined") return null;

  const { container, children } = props;

  const [hasMounted, setHasMounted] = React.useState<boolean>(false);
  const [portalRoot, setPortalRoot] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setHasMounted(true);
    setPortalRoot(document.querySelector(`#${container}`));
  }, [container]);

  if (!hasMounted || !portalRoot) return null;
  return createPortal(children, portalRoot);
};
Portal.displayName = "Portal";
