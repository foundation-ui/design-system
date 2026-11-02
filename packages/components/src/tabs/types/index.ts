import type * as React from "react";

export interface ITabsProperties extends React.ComponentProps<"div"> {
  value?: string;
  defaultOpen?: string;
}
