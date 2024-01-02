import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const ToolbarContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useToolbar = () => useContext(ToolbarContext);

export const ToolbarProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useToolbarProvider();

  return (
    <ToolbarContext.Provider value={context}>
      {children}
    </ToolbarContext.Provider>
  );
};

function useToolbarProvider(): IComponentAPI {
  const [expanded, setExpanded] = useState<boolean>(true);
  const toolbarId = React.useId();

  return {
    id: toolbarId,
    states: {
      expanded,
    },
    methods: {
      toggleToolbar: (state: boolean) => setExpanded(state || !expanded),
    },
  };
}
