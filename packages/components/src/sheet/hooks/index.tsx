"use client";

import React, { createContext, useContext, useState } from "react";

import type { ISheetContext, ISheetProviderProperties } from "../types";

const noop = (): void => {};
const noopState = <T,>(_value: React.SetStateAction<T>): void => {};
const noopId = (): string => "";

const defaultSheetContext: ISheetContext = {
  id: "",
  states: {
    open: false,
  },
  methods: {
    setOpen: noopState,
    toggle: noop,
    getSheetId: noopId,
  },
};

const SheetContext = createContext<ISheetContext>(defaultSheetContext);

export const useSheet = (): ISheetContext => useContext(SheetContext);

export const SheetProvider = ({
  children,
}: ISheetProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <SheetContext.Provider
      value={{
        id,
        states: {
          open,
        },
        methods: {
          setOpen,
          toggle: () => setOpen((current) => !current),
          getSheetId: (type) => (type === "container" ? id : `${id}-trigger`),
        },
      }}
    >
      {children}
    </SheetContext.Provider>
  );
};
