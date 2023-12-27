import React, { useState, createContext, useContext } from "react";
import {
  IReactChildren,
  IComponentAPI,
  TComponentAPI,
} from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const CheckboxContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useCheckbox = () => useContext(CheckboxContext);

export const CheckboxProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useCheckboxProvider();

  return (
    <CheckboxContext.Provider value={context}>
      {children}
    </CheckboxContext.Provider>
  );
};

function useCheckboxProvider(): IComponentAPI {
  const [checked, setChecked] = useState<TComponentAPI>(false);
  const checkboxId = React.useId();

  return {
    id: checkboxId,
    states: {
      checked,
    },
    methods: {
      toggleChecked: () => setChecked(!checked),
      applyChecked: (state: TComponentAPI) => setChecked(state),
    },
  };
}
