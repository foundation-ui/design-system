"use client";

import React, { createContext, useContext } from "react";

import type {
  IContextMenuContext,
  IContextMenuOptions,
  IContextMenuPoint,
  IContextMenuProviderProperties,
  IContextMenuRefs,
} from "../types";

const noop = (): void => {};

const defaultContextMenuContext: IContextMenuContext = {
  id: "",
  states: {
    open: false,
    point: { x: 0, y: 0 },
    invocation: 0,
  },
  methods: {
    setOpen: noop,
    openAt: noop,
    sync: noop,
    configure: noop,
  },
  refs: {
    area: { current: null },
    content: { current: null },
  },
};

const ContextMenuContext = createContext<IContextMenuContext>(
  defaultContextMenuContext,
);

export const useContextMenu = (): IContextMenuContext =>
  useContext(ContextMenuContext);

export const ContextMenuProvider = ({
  children,
}: IContextMenuProviderProperties): React.JSX.Element => {
  const id = React.useId();

  const [open, setOpenState] = React.useState(false);
  const [point, setPoint] = React.useState<IContextMenuPoint>({ x: 0, y: 0 });
  const [invocation, setInvocation] = React.useState(0);

  const areaRef = React.useRef<HTMLElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const optionsRef = React.useRef<IContextMenuOptions>({ controlled: false });

  // All methods are stable so effects depending on them don't re-run on every render.
  const configure = React.useCallback((options: IContextMenuOptions) => {
    optionsRef.current = options;
  }, []);

  const sync = React.useCallback((next: boolean) => setOpenState(next), []);

  const setOpen = React.useCallback((next: boolean) => {
    if (!optionsRef.current.controlled) setOpenState(next);
    optionsRef.current.onOpenChange?.(next);
  }, []);

  const openAt = React.useCallback(
    (nextPoint: IContextMenuPoint) => {
      setPoint(nextPoint);
      setInvocation((current) => current + 1);
      setOpen(true);
    },
    [setOpen],
  );

  const methods = React.useMemo(
    () => ({ setOpen, openAt, sync, configure }),
    [setOpen, openAt, sync, configure],
  );

  const refs: IContextMenuRefs = React.useMemo(
    () => ({ area: areaRef, content: contentRef }),
    [],
  );

  const value = React.useMemo(
    () => ({
      id,
      states: { open, point, invocation },
      methods,
      refs,
    }),
    [id, open, point, invocation, methods, refs],
  );

  return (
    <ContextMenuContext.Provider value={value}>
      {children}
    </ContextMenuContext.Provider>
  );
};
