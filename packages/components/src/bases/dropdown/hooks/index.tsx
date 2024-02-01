import React from "react";
import { IReactChildren, IComponentAPI } from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const DropdownMenuContext =
  React.createContext<IComponentAPI>(defaultComponentAPI);
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
  const triggerId = React.useId();
  const dropdownId = React.useId();
  const composedId = `${triggerId}|${dropdownId}`;

  return {
    id: composedId,
    states: {
      open,
    },
    methods: {
      toggleOpen: (): boolean | void => setOpen(!open),
    },
  };
}
