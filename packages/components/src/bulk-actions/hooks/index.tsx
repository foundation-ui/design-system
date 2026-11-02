"use client";

import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

const noop = (): void => {};
const noopAsync = async (): Promise<void> => {};

const defaultComponentAPI = {
  id: "",
  states: {
    open: true,
    isDragging: false,
    dragOffsetRef: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  },
  methods: {
    setOpen: noop,
    setPosition: noop,
    setIsDragging: noop,
    getId: noop,
  },
};
const BulkActionsContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useBulkActions = () => useContext(BulkActionsContext);

export const BulkActionsProvider = ({
  children,
}: IReactChildren): React.JSX.Element => {
  const context = useBulkActionsProvider();

  return (
    <BulkActionsContext.Provider value={context}>
      {children}
    </BulkActionsContext.Provider>
  );
};

function useBulkActionsProvider(): IComponentAPI {
  const bulkActionsId = React.useId();

  const [open, setOpen] = useState<boolean>(true);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);

  const dragOffsetRef = React.useRef<{ x: number; y: number } | null>({
    x: 0,
    y: 0,
  });

  return {
    id: bulkActionsId,
    states: {
      open,
      position,
      isDragging,
      dragOffsetRef,
    },
    methods: {
      setOpen,
      setPosition,
      setIsDragging,
      getId: (type: "trigger" | "bulk-actions" | "inner-control"): string =>
        `${bulkActionsId}-${type}`,
    },
  };
}
