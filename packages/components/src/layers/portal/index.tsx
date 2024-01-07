import React from "react";
import ReactDOM from "react-dom";

export interface IPortalProperties {
  container: string;
  children?: React.ReactNode;
}

export const Portal = (props: IPortalProperties) => {
  const { container, children } = props;

  const [hasMounted, setHasMounted] = React.useState<boolean>(false);
  const PortalRoot = document.querySelector(`#${container}`)!;

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;
  return ReactDOM.createPortal(children, PortalRoot);
};
