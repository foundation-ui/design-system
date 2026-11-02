"use client";

import React, { createContext, useContext, useState } from "react";

import type { ICheckboxContext, ICheckboxProviderProperties } from "../types";

const noop = (): void => {};

const defaultCheckboxContext: ICheckboxContext = {
  id: "",
  states: {
    checked: false,
    indeterminate: false,
  },
  methods: {
    toggleChecked: noop,
    applyChecked: noop,
    applyIndeterminate: noop,
  },
};

const CheckboxContext = createContext<ICheckboxContext>(defaultCheckboxContext);

export const useCheckbox = (): ICheckboxContext => useContext(CheckboxContext);

export const CheckboxProvider = ({
  children,
}: ICheckboxProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [checked, setChecked] = useState<boolean>(false);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);

  return (
    <CheckboxContext.Provider
      value={{
        id,
        states: {
          checked,
          indeterminate,
        },
        methods: {
          toggleChecked: () => setChecked((current) => !current),
          applyChecked: (nextChecked) => setChecked(Boolean(nextChecked)),
          applyIndeterminate: (nextIndeterminate) =>
            setIndeterminate(Boolean(nextIndeterminate)),
        },
      }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};
