"use client";

import React from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

const defaultComponentAPI: IComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const SelectContext = React.createContext<IComponentAPI>(defaultComponentAPI);
export const useSelect = () => React.useContext(SelectContext);

export const SelectProvider = ({
  children,
}: IReactChildren): React.JSX.Element => {
  const context = useSelectProvider();

  return (
    <SelectContext.Provider value={context}>{children}</SelectContext.Provider>
  );
};

function useSelectProvider(): IComponentAPI {
  const DEFAULT_POSITIONS = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const DEFAULT_DIMENSIONS = {
    width: 0,
    height: 0,
  };

  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string | null>(null);
  const [label, setLabel] = React.useState<string>("");

  const [contentProps, setContentProps] = React.useState({
    ...DEFAULT_POSITIONS,
    ...DEFAULT_DIMENSIONS,
  });
  const [triggerProps, setTriggerProps] = React.useState({
    ...DEFAULT_POSITIONS,
    ...DEFAULT_DIMENSIONS,
  });

  const triggerId = React.useId();
  const listboxId = React.useId();
  const composedId = `${triggerId}|${listboxId}`;

  return {
    id: composedId,
    states: {
      open,
      value,
      label,
      contentProps,
      triggerProps,
    },
    methods: {
      toggleOpen: (): boolean | void => setOpen(!open),
      setOpen,
      setValue,
      setLabel,
      setContentProps,
      setTriggerProps,
    },
  };
}
