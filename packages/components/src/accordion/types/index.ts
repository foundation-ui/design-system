import type * as React from "react";
import type { IComponentSpacing } from "../../../../../types";
import type { IButtonProperties } from "../../button/types";

export interface IAccordionProperties
  extends IComponentSpacing, React.ComponentProps<"div"> {}

export interface IAccordionTriggerProperties extends IButtonProperties {
  value: string;
}

export interface IAccordionContentProperties extends IAccordionProperties {
  defaultOpen?: boolean;
  value: string;
}
