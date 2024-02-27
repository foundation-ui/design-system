import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const CollapsibleContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useCollapsible = () => useContext(CollapsibleContext);

export const CollapsibleProvider = ({
  children,
}: IReactChildren): JSX.Element => {
  const context = useCollapsibleProvider();

  return (
    <CollapsibleContext.Provider value={context}>
      {children}
    </CollapsibleContext.Provider>
  );
};

function useCollapsibleProvider(): IComponentAPI {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [defaultOpen, setDefaultOpen] = useState<boolean>(false);
  const collapsibleId = React.useId();

  const toggleCollapsible = () => {
    setExpanded(!expanded);
    setDefaultOpen(false);
  };

  const applyDefaultOpen = () => {
    setExpanded(!expanded);
    setDefaultOpen(true);
  };

  return {
    id: collapsibleId,
    states: {
      expanded,
      defaultOpen,
    },
    methods: {
      toggleCollapsible: () => toggleCollapsible(),
      applyDefaultOpen: () => applyDefaultOpen(),
    },
  };
}
