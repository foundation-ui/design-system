import type * as React from "react";
import type { IComponentSpacing, IReactChildren } from "../../types";
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

export interface IAccordionStates {
  value: string | null;
}

export interface IAccordionMethods {
  applyValue: (value: string | null) => void;
  getAccordionId: (params: {
    value: string;
    type: "trigger" | "content";
  }) => string;
}

export interface IAccordionContext {
  id: string;
  states: IAccordionStates;
  methods: IAccordionMethods;
}

export interface IAccordionProviderProperties extends IReactChildren {}
