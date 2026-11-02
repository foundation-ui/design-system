"use client";

import React, { createContext, useContext, useState } from "react";

import type {
  IBulkActionsContext,
  IBulkActionsProviderProperties,
} from "../types";

const noop = (): void => {};
const noopState = <T,>(_value: React.SetStateAction<T>): void => {};
const noopId = (): string => "";

const defaultBulkActionsContext: IBulkActionsContext = {
  id: "",
  states: {
    open: true,
    isDragging: false,
    dragOffsetRef: { current: { x: 0, y: 0 } },
    position: { x: 0, y: 0 },
  },
  methods: {
    setOpen: noopState,
    setPosition: noopState,
    setIsDragging: noopState,
    getId: noopId,
  },
};

const BulkActionsContext = createContext<IBulkActionsContext>(
  defaultBulkActionsContext,
);

export const useBulkActions = (): IBulkActionsContext =>
  useContext(BulkActionsContext);

export const BulkActionsProvider = ({
  children,
}: IBulkActionsProviderProperties): React.JSX.Element => {
  const id = React.useId();

  const [open, setOpen] = useState<boolean>(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = React.useRef<{ x: number; y: number } | null>({
    x: 0,
    y: 0,
  });

  return (
    <BulkActionsContext.Provider
      value={{
        id,
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
          getId: (type) => `${id}-${type}`,
        },
      }}
    >
      {children}
    </BulkActionsContext.Provider>
  );
};
