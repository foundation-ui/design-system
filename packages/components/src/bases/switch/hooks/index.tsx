import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const SwitchContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useSwitch = () => useContext(SwitchContext);

export const SwitchProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useSwitchProvider();

  return (
    <SwitchContext.Provider value={context}>{children}</SwitchContext.Provider>
  );
};

function useSwitchProvider(): IComponentAPI {
  const [checked, setChecked] = useState<boolean>(false);
  const switchId = React.useId();

  return {
    id: switchId,
    states: {
      checked,
    },
    methods: {
      toggleSwitch: (): boolean | void => setChecked(!checked),
    },
  };
}
