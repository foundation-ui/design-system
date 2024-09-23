import React from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

const DEFAULT_API = {
  id: "",
  states: {},
  methods: {},
};
const DEFAULT_POSITIONS = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
const DEFAULT_DIMENSIONS = {
  width: 0,
  height: 0,
};

const DropdownMenuContext = React.createContext<IComponentAPI>(DEFAULT_API);
export const useDropdownMenu = () => React.useContext(DropdownMenuContext);

export const DropdownMenuProvider = ({
  children,
}: IReactChildren): JSX.Element => {
  const context = useDropdownMenuProvider();

  return (
    <DropdownMenuContext.Provider value={context}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

function useDropdownMenuProvider(): IComponentAPI {
  const [open, setOpen] = React.useState<boolean>(false);

  const [contentProps, setContentProps] = React.useState({
    ...DEFAULT_POSITIONS,
    ...DEFAULT_DIMENSIONS,
  });
  const [triggerProps, setTriggerProps] = React.useState({
    ...DEFAULT_POSITIONS,
    ...DEFAULT_DIMENSIONS,
  });

  const triggerId = React.useId();
  const dropdownId = React.useId();
  const composedId = `${triggerId}|${dropdownId}`;

  return {
    id: composedId,
    states: {
      open,
      contentProps,
      triggerProps,
    },
    methods: {
      toggleOpen: (): boolean | void => setOpen(!open),
      setContentProps,
      setTriggerProps,
    },
  };
}
