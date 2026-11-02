"use client";

import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const DrawerContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({
  children,
}: IReactChildren): React.JSX.Element => {
  const context = useDrawerProvider();

  return (
    <DrawerContext.Provider value={context}>{children}</DrawerContext.Provider>
  );
};

function useDrawerProvider(): IComponentAPI {
  const [open, setOpen] = useState<boolean>(false);
  const DrawerId = React.useId();

  return {
    id: DrawerId,
    states: {
      open: open,
    },
    methods: {
      toggleDrawer: () => setOpen(!open),
      getDrawerId: (type: "trigger" | "Drawer" | "inner-control"): string =>
        `${DrawerId}-${type}`,
    },
  };
}
