"use client";

import React, { createContext, useContext, useState } from "react";

import type { IDialogContext, IDialogProviderProperties } from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultDialogContext: IDialogContext = {
  id: "",
  states: {
    open: false,
  },
  methods: {
    toggleDialog: noop,
    getDialogId: noopId,
  },
};

const DialogContext = createContext<IDialogContext>(defaultDialogContext);

export const useDialog = (): IDialogContext => useContext(DialogContext);

export const DialogProvider = ({
  children,
}: IDialogProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DialogContext.Provider
      value={{
        id,
        states: {
          open,
        },
        methods: {
          toggleDialog: () => setOpen((current) => !current),
          getDialogId: (type) => `${id}-${type}`,
        },
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
