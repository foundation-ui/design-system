"use client";

import React, { useState, createContext, useContext } from "react";
import {
  IReactChildren,
  IComponentAPI,
  TComponentAPI,
} from "../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const CheckboxContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useCheckbox = () => useContext(CheckboxContext);

export const CheckboxProvider = ({
  children,
}: IReactChildren): React.JSX.Element => {
  const context = useCheckboxProvider();

  return (
    <CheckboxContext.Provider value={context}>
      {children}
    </CheckboxContext.Provider>
  );
};

function useCheckboxProvider(): IComponentAPI {
  const [checked, setChecked] = useState<boolean>(false);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const checkboxId = React.useId();

  return {
    id: checkboxId,
    states: {
      checked,
      indeterminate,
    },
    methods: {
      toggleChecked: () => setChecked((prev) => !prev),
      applyChecked: (state: TComponentAPI) => setChecked(Boolean(state)),
      applyIndeterminate: (state: TComponentAPI) =>
        setIndeterminate(Boolean(state)),
    },
  };
}
