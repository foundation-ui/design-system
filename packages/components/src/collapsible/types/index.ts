import type * as React from "react";

export interface ICollapsibleProperties extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
  showFirstChild?: boolean;
}
