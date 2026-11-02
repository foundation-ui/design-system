import type * as React from "react";
import type { IButtonProperties } from "../../button/types";
import type { IReactChildren } from "../../../../../types";

export interface IWhiteboardOptionsProperties {
  step?: number;
  min?: number;
  max?: number;
}

export interface IWhiteboardZoomProperties
  extends IButtonProperties, IWhiteboardOptionsProperties {
  direction: "in" | "out" | "reset";
  initial?: number;
  children: React.ReactNode;
}

export interface IWhiteboardProperties extends IWhiteboardOptionsProperties {
  allowWheelZoom?: boolean;
  allowDrag?: boolean;
  children: React.ReactNode;
}

export interface IWhiteboardStates {
  whiteboardOffset: { x: number; y: number };
  isDraggingWhiteboard: boolean;
  dragStart: { x: number; y: number };
  zoomLevel: number;
}

export interface IWhiteboardMethods {
  setWhiteboardOffset: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setIsDraggingWhiteboard: React.Dispatch<React.SetStateAction<boolean>>;
  setDragStart: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
}

export interface IWhiteboardContext {
  id: string;
  states: IWhiteboardStates;
  methods: IWhiteboardMethods;
}

export interface IWhiteboardProviderProperties extends IReactChildren {}
