import React from "react";
import { IReactChildren } from "../../../../../types";

type MethodsType = React.Dispatch<React.SetStateAction<boolean>> | any;
interface IContextProperties {
  id: Record<string, string>;
  states: Record<string, string | boolean>;
  methods: Record<string, MethodsType>;
}

const SheetContext = React.createContext<IContextProperties>({
  id: {},
  states: {},
  methods: {},
});
export const useSheet = () => React.useContext(SheetContext);

export const SheetProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useSheetProvider();

  return (
    <SheetContext.Provider value={context}>{children}</SheetContext.Provider>
  );
};

function useSheetProvider(): IContextProperties {
  const containerId = React.useId();
  const triggerId = React.useId();
  const controlId = React.useId();

  const [open, setOpen] = React.useState<boolean>(false);

  return {
    id: {
      containerId,
      triggerId,
      controlId,
    },
    states: {
      open,
    },
    methods: {
      setOpen,
      toggle: () => setOpen(!open),
    },
  };
}
