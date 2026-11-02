import type * as React from "react";
import type { IButtonProperties } from "../../button/types";

export interface ActionSwapProperties extends IButtonProperties {
  delay?: number;
  actions: React.ReactNode[];
}

export interface ActionSwapCopyProperties extends IButtonProperties {
  value?: string;
  delay?: number;
  actions?: React.ReactNode[];
}
