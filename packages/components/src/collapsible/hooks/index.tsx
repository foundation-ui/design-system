"use client";

import React, { createContext, useContext, useState } from "react";

import type {
  ICollapsibleContext,
  ICollapsibleProviderProperties,
} from "../types";

const noop = (): void => {};

const defaultCollapsibleContext: ICollapsibleContext = {
  id: "",
  states: {
    expanded: false,
    defaultOpen: false,
  },
  methods: {
    toggleCollapsible: noop,
    applyDefaultOpen: noop,
  },
};

const CollapsibleContext = createContext<ICollapsibleContext>(
  defaultCollapsibleContext,
);

export const useCollapsible = (): ICollapsibleContext =>
  useContext(CollapsibleContext);

export const CollapsibleProvider = ({
  children,
}: ICollapsibleProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [defaultOpen, setDefaultOpen] = useState<boolean>(false);

  const toggleCollapsible = () => {
    setExpanded((current) => !current);
    setDefaultOpen(false);
  };

  const applyDefaultOpen = () => {
    setExpanded((current) => !current);
    setDefaultOpen(true);
  };

  return (
    <CollapsibleContext.Provider
      value={{
        id,
        states: {
          expanded,
          defaultOpen,
        },
        methods: {
          toggleCollapsible,
          applyDefaultOpen,
        },
      }}
    >
      {children}
    </CollapsibleContext.Provider>
  );
};
