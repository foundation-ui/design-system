"use client";

import React, { createContext, useContext, useState } from "react";

import type { IWizardContext, IWizardProviderProperties } from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultWizardContext: IWizardContext = {
  id: "",
  states: {
    value: null,
    views: [],
  },
  methods: {
    applyValue: noop,
    applyViews: noop,
    getWizardId: noopId,
  },
};

const WizardContext = createContext<IWizardContext>(defaultWizardContext);

export const useWizard = (): IWizardContext => useContext(WizardContext);

export const WizardProvider = ({
  children,
}: IWizardProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [value, setValue] = useState<string | null>(null);
  const [views, setViews] = useState<string[]>([]);

  return (
    <WizardContext.Provider
      value={{
        id,
        states: {
          value,
          views,
        },
        methods: {
          applyValue: (nextValue) => setValue(nextValue),
          applyViews: (nextViews) => setViews(nextViews),
          getWizardId: ({ value, type }) => `${id}-${type}-${value}`,
        },
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
