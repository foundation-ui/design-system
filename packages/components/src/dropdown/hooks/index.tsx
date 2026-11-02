"use client";

import React, { createContext, useContext, useState } from "react";

import type {
  IDropdownContext,
  IDropdownMetrics,
  IDropdownProviderProperties,
} from "../types";

const noop = (): void => {};
const noopState = <T,>(_value: React.SetStateAction<T>): void => {};

const DEFAULT_METRICS: IDropdownMetrics = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
};

const defaultDropdownContext: IDropdownContext = {
  id: "",
  states: {
    open: false,
    contentProps: DEFAULT_METRICS,
    triggerProps: DEFAULT_METRICS,
  },
  methods: {
    toggleOpen: noop,
    setContentProps: noopState,
    setTriggerProps: noopState,
  },
};

const DropdownMenuContext = createContext<IDropdownContext>(
  defaultDropdownContext,
);

export const useDropdownMenu = (): IDropdownContext =>
  useContext(DropdownMenuContext);

export const DropdownMenuProvider = ({
  children,
}: IDropdownProviderProperties): React.JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [contentProps, setContentProps] = useState(DEFAULT_METRICS);
  const [triggerProps, setTriggerProps] = useState(DEFAULT_METRICS);

  const triggerId = React.useId();
  const dropdownId = React.useId();
  const id = `${triggerId}|${dropdownId}`;

  return (
    <DropdownMenuContext.Provider
      value={{
        id,
        states: {
          open,
          contentProps,
          triggerProps,
        },
        methods: {
          toggleOpen: () => setOpen((current) => !current),
          setContentProps,
          setTriggerProps,
        },
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
};
