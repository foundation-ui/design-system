import type * as React from "react";
import type { IReactChildren } from "../../../../../types";
import type { IButtonProperties } from "../../button/types";

export interface ITabsProperties extends React.ComponentProps<"div"> {
  value?: string;
  defaultOpen?: string;
}

export interface ITabsTriggerProperties extends IButtonProperties {
  value: string;
}

export interface ITabsStates {
  value: string | null;
}

export interface ITabsMethods {
  applyValue: (value: string | null) => void;
  getTabsId: (params: {
    value: string | undefined;
    type: "trigger" | "content";
  }) => string;
}

export interface ITabsContext {
  id: string;
  states: ITabsStates;
  methods: ITabsMethods;
}

export interface ITabsProviderProperties extends IReactChildren {}
