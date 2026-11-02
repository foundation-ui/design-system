"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import type {
  ISharedLayoutContext,
  ISharedLayoutProviderProperties,
  SharedLayoutElementType,
} from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultSharedLayoutContext: ISharedLayoutContext = {
  id: "",
  states: {
    as: "div",
    pill: {
      top: 0,
      height: 0,
      visible: false,
      moving: false,
    },
  },
  methods: {
    activate: noop,
    hide: noop,
    applyAs: noop,
    setHovering: noop,
    isHovering: () => false,
    getSharedLayoutId: noopId,
  },
};

const SharedLayoutContext = createContext<ISharedLayoutContext>(
  defaultSharedLayoutContext,
);

export const useSharedLayout = (): ISharedLayoutContext =>
  useContext(SharedLayoutContext);

export const SharedLayoutProvider = ({
  children,
}: ISharedLayoutProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [as, setAs] = useState<SharedLayoutElementType>("div");
  const [pill, setPill] = useState({
    top: 0,
    height: 0,
    visible: false,
    moving: false,
  });
  const visibleRef = useRef(false);
  // Focus leaving the layout only clears the pill when the pointer is not
  // still resting on an item.
  const hoveringRef = useRef(false);

  const activate = useCallback((element: HTMLElement) => {
    setPill({
      top: element.offsetTop,
      height: element.offsetHeight,
      visible: true,
      // Only animate the position when the pill is already on screen.
      moving: visibleRef.current,
    });
    visibleRef.current = true;
  }, []);

  const hide = useCallback(() => {
    visibleRef.current = false;
    setPill((current) => ({ ...current, visible: false, moving: false }));
  }, []);

  const applyAs = useCallback(
    (value: SharedLayoutElementType): void => setAs(value),
    [],
  );
  const setHovering = useCallback((value: boolean): void => {
    hoveringRef.current = value;
  }, []);
  const isHovering = useCallback((): boolean => hoveringRef.current, []);

  return (
    <SharedLayoutContext.Provider
      value={{
        id,
        states: {
          as,
          pill,
        },
        methods: {
          activate,
          hide,
          applyAs,
          setHovering,
          isHovering,
          getSharedLayoutId: ({ value, type }) => `${id}-${type}-${value}`,
        },
      }}
    >
      {children}
    </SharedLayoutContext.Provider>
  );
};
