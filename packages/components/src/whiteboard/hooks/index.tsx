"use client";

import React, { createContext, useContext, useState } from "react";

import type {
  IWhiteboardContext,
  IWhiteboardProviderProperties,
} from "../types";

const noop = (): void => {};
const noopState = <T,>(_value: React.SetStateAction<T>): void => {};

const defaultWhiteboardContext: IWhiteboardContext = {
  id: "",
  states: {
    whiteboardOffset: { x: 0, y: 0 },
    isDraggingWhiteboard: false,
    dragStart: { x: 0, y: 0 },
    zoomLevel: 1,
  },
  methods: {
    setWhiteboardOffset: noopState,
    setIsDraggingWhiteboard: noopState,
    setDragStart: noopState,
    setZoomLevel: noopState,
  },
};

const WhiteboardContext = createContext<IWhiteboardContext>(
  defaultWhiteboardContext,
);

export const useWhiteboard = (): IWhiteboardContext =>
  useContext(WhiteboardContext);

export const WhiteboardProvider = ({
  children,
}: IWhiteboardProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [whiteboardOffset, setWhiteboardOffset] = useState({
    x: 0,
    y: 0,
  });
  const [isDraggingWhiteboard, setIsDraggingWhiteboard] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <WhiteboardContext.Provider
      value={{
        id,
        states: {
          whiteboardOffset,
          isDraggingWhiteboard,
          dragStart,
          zoomLevel,
        },
        methods: {
          setWhiteboardOffset,
          setIsDraggingWhiteboard,
          setDragStart,
          setZoomLevel,
        },
      }}
    >
      {children}
    </WhiteboardContext.Provider>
  );
};
