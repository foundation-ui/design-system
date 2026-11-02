"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useIsMobile } from "@usefui/hooks";

import type {
  IToolbarContext,
  IToolbarMobileConfig,
  IToolbarProviderProps,
} from "../types";

const TOOLBAR_KEYBOARD_SHORTCUT = "b";
const DEFAULT_BREAKPOINT = 768;

const noop = (): void => {};

const defaultToolbarContext: IToolbarContext = {
  id: "",
  states: {
    state: "collapsed",
    open: false,
    isMobile: false,
    openMobile: false,
    expanded: false,
  },
  methods: {
    setOpen: noop,
    setOpenMobile: noop,
    setExpanded: noop,
    toggle: noop,
    configure: noop,
  },
};

const ToolbarContext = createContext<IToolbarContext>(defaultToolbarContext);

export const useToolbar = (): IToolbarContext => useContext(ToolbarContext);

export const ToolbarProvider = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  keyboardShortcut = true,
  breakOnMobile: rootBreakOnMobile = true,
  breakpoint: rootBreakpoint = DEFAULT_BREAKPOINT,
}: IToolbarProviderProps): React.JSX.Element => {
  const id = React.useId();

  // Root sets the defaults, <Toolbar /> props override them via `configure`
  const [config, setConfig] = useState({
    breakOnMobile: rootBreakOnMobile,
    breakpoint: rootBreakpoint,
  });
  const configure = useCallback((next: IToolbarMobileConfig) => {
    setConfig((prev) => {
      const breakOnMobile = next.breakOnMobile ?? prev.breakOnMobile;
      const breakpoint = next.breakpoint ?? prev.breakpoint;
      return breakOnMobile === prev.breakOnMobile &&
        breakpoint === prev.breakpoint
        ? prev
        : { breakOnMobile, breakpoint };
    });
  }, []);

  const belowBreakpoint = useIsMobile({ breakpoint: config.breakpoint });
  const isMobile = config.breakOnMobile && belowBreakpoint;

  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const [openMobile, setOpenMobile] = useState<boolean>(false);

  const isControlled = openProp !== undefined;
  const open = isControlled ? (openProp as boolean) : internalOpen;
  const expanded = isMobile ? openMobile : open;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const setExpanded = useCallback(
    (next: boolean) => (isMobile ? setOpenMobile(next) : setOpen(next)),
    [isMobile, setOpen],
  );

  const toggle = useCallback(
    () => setExpanded(!expanded),
    [setExpanded, expanded],
  );

  // Close when crossing the breakpoint in either direction
  const openRef = useRef(open);
  openRef.current = open;
  const prevMobile = useRef(isMobile);
  useEffect(() => {
    if (prevMobile.current === isMobile) return;
    prevMobile.current = isMobile;

    setOpenMobile(false);
    if (isMobile && openRef.current) setOpen(false);
  }, [isMobile, setOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;

      if (
        keyboardShortcut &&
        !event.repeat &&
        event.key?.toLowerCase() === TOOLBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggle();
        return;
      }

      if (event.key === "Escape" && isMobile && openMobile) {
        setOpenMobile(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle, keyboardShortcut, isMobile, openMobile]);

  const value = useMemo<IToolbarContext>(
    () => ({
      id,
      states: {
        state: expanded ? "expanded" : "collapsed",
        open,
        isMobile,
        openMobile,
        expanded,
      },
      methods: { setOpen, setOpenMobile, setExpanded, toggle, configure },
    }),
    [
      id,
      expanded,
      open,
      isMobile,
      openMobile,
      setOpen,
      setExpanded,
      toggle,
      configure,
    ],
  );

  return (
    <ToolbarContext.Provider value={value}>{children}</ToolbarContext.Provider>
  );
};
