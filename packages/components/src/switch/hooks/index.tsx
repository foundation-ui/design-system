"use client";

import React, { createContext, useContext, useState } from "react";

import type { ISwitchContext, ISwitchProviderProperties } from "../types";

const noop = (): void => {};

const defaultSwitchContext: ISwitchContext = {
  id: "",
  states: {
    checked: false,
  },
  methods: {
    toggleChecked: noop,
    applyChecked: noop,
  },
};

const SwitchContext = createContext<ISwitchContext>(defaultSwitchContext);

export const useSwitch = (): ISwitchContext => useContext(SwitchContext);

export const SwitchProvider = ({
  children,
}: ISwitchProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <SwitchContext.Provider
      value={{
        id,
        states: {
          checked,
        },
        methods: {
          toggleChecked: () => setChecked((current) => !current),
          applyChecked: (nextChecked) => setChecked(Boolean(nextChecked)),
        },
      }}
    >
      {children}
    </SwitchContext.Provider>
  );
};
