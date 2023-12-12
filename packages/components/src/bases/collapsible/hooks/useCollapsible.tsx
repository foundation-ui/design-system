import React, { useState, createContext, useContext } from "react";
import { IReactChildren } from "../../../../../../types";

const CollapsibleContext = createContext<object | any>({});
export const useCollapsible = () => useContext(CollapsibleContext);
export const CollapsibleProvider = ({
  children,
}: IReactChildren): JSX.Element => {
  const _context = useCollapsibleProvider();

  return (
    <CollapsibleContext.Provider value={_context}>
      {children}
    </CollapsibleContext.Provider>
  );
};

function useCollapsibleProvider(): object {
  const id = React.useId();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [defaultOpen, setDefaultOpen] = useState<boolean>(false);

  const toggleCollapsible = () => {
    setExpanded(!expanded);
    setDefaultOpen(false);
  };

  const applyDefaultOpen = () => {
    setExpanded(!expanded);
    setDefaultOpen(true);
  };

  return {
    id,
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
