"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useIsMobile } from "@usefui/hooks";
import { IReactChildren } from "../../../../../types";

const TOOLBAR_KEYBOARD_SHORTCUT = "b";

export interface IToolbarContext {
  id: string;
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
}
export interface IToolbarProviderProps extends IReactChildren {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ToolbarContext = createContext<IToolbarContext | null>(null);

export const useToolbar = () => {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error("useToolbar must be used within a Toolbar.Root.");
  }
  return context;
};

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
  const open = isControlled ? openProp : internalOpen;

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

  const value = useMemo<IToolbarContext>(
    () => ({
      id,
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      toggle,
      isMobile,
      openMobile,
      setOpenMobile,
    }),
    [id, open, setOpen, toggle, isMobile, openMobile],
  );

  return (
    <ToolbarContext.Provider value={value}>{children}</ToolbarContext.Provider>
  );
};
