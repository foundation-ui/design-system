import type * as React from "react";
import type { IButtonProperties } from "../../button/types";

export interface BreadcrumbProps extends React.ComponentProps<"div"> {
  navigate?: (href: string) => void;
  capitalizeItems?: boolean;
  path: string;
}

export interface BreadcrumbItemProps extends IButtonProperties {
  isLastItem?: boolean;
}
