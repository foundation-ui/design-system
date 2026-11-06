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
  SharedLayoutDirection,
  SharedLayoutElementType,
} from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultSharedLayoutContext: ISharedLayoutContext = {
  id: "",
  states: {
    as: "div",
    direction: "y",
    pill: {
      top: 0,
      height: 0,
      left: 0,
      width: 0,
      visible: false,
      moving: false,
    },
  },
  methods: {
    activate: noop,
    hide: noop,
    applyAs: noop,
    applyDirection: noop,
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
  const [direction, setDirection] = useState<SharedLayoutDirection>("y");
  const [pill, setPill] = useState({
    top: 0,
    height: 0,
    left: 0,
    width: 0,
    visible: false,
    moving: false,
  });
  const visibleRef = useRef(false);
  const directionRef = useRef<SharedLayoutDirection>("y");
  // Focus leaving the layout only clears the pill when the pointer is not
  // still resting on an item.
  const hoveringRef = useRef(false);

  const activate = useCallback((element: HTMLElement) => {
    if (directionRef.current === "x") {
      setPill({
        top: 0,
        height: 0,
        left: element.offsetLeft,
        width: element.offsetWidth,
        visible: true,
        // Only animate the position when the pill is already on screen.
        moving: visibleRef.current,
      });
    } else {
      setPill({
        top: element.offsetTop,
        height: element.offsetHeight,
        left: 0,
        width: 0,
        visible: true,
        // Only animate the position when the pill is already on screen.
        moving: visibleRef.current,
      });
    }
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
  const applyDirection = useCallback((value: SharedLayoutDirection): void => {
    directionRef.current = value;
    setDirection(value);
  }, []);
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
          direction,
          pill,
        },
        methods: {
          activate,
          hide,
          applyAs,
          applyDirection,
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