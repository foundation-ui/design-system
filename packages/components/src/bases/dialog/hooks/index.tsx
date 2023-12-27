import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const DialogContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useDialogProvider();

  return (
    <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
  );
};

function useDialogProvider(): IComponentAPI {
  const [open, setOpen] = useState<boolean>(false);
  const dialogId = React.useId();

  return {
    id: dialogId,
    states: {
      open: open,
    },
    methods: {
      toggleDialog: () => setOpen(!open),
      openDialog: () => setOpen(true),
      getDialogId: (type: "trigger" | "dialog" | "inner-control"): string =>
        `${dialogId}-${type}`,
    },
  };
}
