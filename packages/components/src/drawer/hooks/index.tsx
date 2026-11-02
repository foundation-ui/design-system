"use client";

import React, { createContext, useContext, useState } from "react";

import type { IDrawerContext, IDrawerProviderProperties } from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultDrawerContext: IDrawerContext = {
  id: "",
  states: {
    open: false,
  },
  methods: {
    toggleDrawer: noop,
    getDrawerId: noopId,
  },
};

const DrawerContext = createContext<IDrawerContext>(defaultDrawerContext);

export const useDrawer = (): IDrawerContext => useContext(DrawerContext);

export const DrawerProvider = ({
  children,
}: IDrawerProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DrawerContext.Provider
      value={{
        id,
        states: {
          open,
        },
        methods: {
          toggleDrawer: () => setOpen((current) => !current),
          getDrawerId: (type) => `${id}-${type}`,
        },
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
