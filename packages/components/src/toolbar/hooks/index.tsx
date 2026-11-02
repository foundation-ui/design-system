"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useIsMobile } from "@usefui/hooks";

import type { IToolbarContext, IToolbarProviderProps } from "../types";

const TOOLBAR_KEYBOARD_SHORTCUT = "b";

const noop = (): void => {};

const defaultToolbarContext: IToolbarContext = {
  id: "",
  states: {
    state: "collapsed",
    open: false,
    isMobile: false,
    openMobile: false,
  },
  methods: {
    setOpen: noop,
    toggle: noop,
    setOpenMobile: noop,
  },
};

const ToolbarContext = createContext<IToolbarContext>(defaultToolbarContext);

export const useToolbar = (): IToolbarContext => useContext(ToolbarContext);

export const ToolbarProvider = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: IToolbarProviderProps): React.JSX.Element => {
  const id = React.useId();
  const isMobile = useIsMobile({ breakpoint: 768 });

  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const [openMobile, setOpenMobile] = useState<boolean>(false);

  const isControlled = openProp !== undefined;
  const open = isControlled ? (openProp as boolean) : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => {
    if (isMobile) setOpenMobile((prev) => !prev);
    else setOpen(!open);
  }, [isMobile, open, setOpen]);

  // Keyboard shortcut: Ctrl/Cmd + B
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === TOOLBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  return (
    <ToolbarContext.Provider
      value={{
        id,
        states: {
          state: open ? "expanded" : "collapsed",
          open,
          isMobile,
          openMobile,
        },
        methods: {
          setOpen,
          toggle,
          setOpenMobile,
        },
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};
