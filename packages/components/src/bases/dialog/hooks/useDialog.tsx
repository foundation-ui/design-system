import React, { useState, createContext, useContext } from "react";
import { IReactChildren } from "../../../../../../types";

const DialogContext = createContext<object | any>({});
export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useDialogProvider();

  return (
    <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
  );
};

function useDialogProvider(): object {
  const dialogId = React.useId();
  const [open, setOpen] = useState<boolean>(false);

  return {
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
