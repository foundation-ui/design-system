import React from "react";

import type { IReactChildren } from "../../types";
import type { IButtonProperties } from "../../button/types";

export interface IWizardProperties extends React.ComponentProps<"div"> {
  views: string[];
}

export interface IWizardViewProperties extends React.ComponentProps<"div"> {
  value: string;
}

export interface IWizardTriggerProperties extends IButtonProperties {
  value: string;
}

export interface IWizardNavigationProperties extends IButtonProperties {}

export interface IWizardStates {
  value: string | null;
  views: string[];
}

export interface IWizardMethods {
  applyValue: (value: string | null) => void;
  applyViews: (views: string[]) => void;
  getWizardId: (params: {
    value: string | undefined;
    type: "trigger" | "content";
  }) => string;
}

export interface IWizardContext {
  id: string;
  states: IWizardStates;
  methods: IWizardMethods;
}

export interface IWizardProviderProperties extends IReactChildren {}
