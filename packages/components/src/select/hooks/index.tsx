"use client";

import React, { createContext, useContext, useState } from "react";

import type {
  ISelectContext,
  ISelectMetrics,
  ISelectProviderProperties,
} from "../types";

const noop = (): void => {};
const noopState = <T,>(_value: React.SetStateAction<T>): void => {};

const DEFAULT_METRICS: ISelectMetrics = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
};

const defaultSelectContext: ISelectContext = {
  id: "",
  states: {
    open: false,
    value: null,
    label: "",
    contentProps: DEFAULT_METRICS,
    triggerProps: DEFAULT_METRICS,
  },
  methods: {
    toggleOpen: noop,
    setOpen: noopState,
    setValue: noopState,
    setLabel: noopState,
    setContentProps: noopState,
    setTriggerProps: noopState,
  },
};

const SelectContext = createContext<ISelectContext>(defaultSelectContext);

export const useSelect = (): ISelectContext => useContext(SelectContext);

export const SelectProvider = ({
  children,
}: ISelectProviderProperties): React.JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [label, setLabel] = useState<string>("");
  const [contentProps, setContentProps] = useState(DEFAULT_METRICS);
  const [triggerProps, setTriggerProps] = useState(DEFAULT_METRICS);

  const triggerId = React.useId();
  const listboxId = React.useId();
  const id = `${triggerId}|${listboxId}`;

  return (
    <SelectContext.Provider
      value={{
        id,
        states: {
          open,
          value,
          label,
          contentProps,
          triggerProps,
        },
        methods: {
          toggleOpen: () => setOpen((current) => !current),
          setOpen,
          setValue,
          setLabel,
          setContentProps,
          setTriggerProps,
        },
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};
