"use client";

import React, {
  useState,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

export type SharedLayoutElementType = "div" | "ul";

export interface ISharedLayoutPillState {
  top: number;
  height: number;
  visible: boolean;
  moving: boolean;
}

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const SharedLayoutContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useSharedLayout = () => useContext(SharedLayoutContext);

export const SharedLayoutProvider = ({
  children,
}: IReactChildren): React.JSX.Element => {
  const context = useSharedLayoutProvider();

  return (
    <SharedLayoutContext.Provider value={context}>
      {children}
    </SharedLayoutContext.Provider>
  );
};

function useSharedLayoutProvider(): IComponentAPI {
  const [as, setAs] = useState<SharedLayoutElementType>("div");
  const [pill, setPill] = useState<ISharedLayoutPillState>({
    top: 0,
    height: 0,
    visible: false,
    moving: false,
  });
  const sharedLayoutId = React.useId();
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

  return {
    id: sharedLayoutId,
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
      getSharedLayoutId: ({ value, type }: Record<string, string>): string =>
        `${sharedLayoutId}-${type}-${value}`,
    },
  };
}
