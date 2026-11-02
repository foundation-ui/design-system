import type * as React from "react";
import type { IReactChildren } from "../../types";

export interface Guide {
  id: string;
  position: number;
  orientation: "horizontal" | "vertical";
}

export interface IRulerStates {
  guides: Guide[];
  activeGuide: Guide | null;
  isDragging: boolean;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export interface IRulerMethods {
  addGuide: (guide: Omit<Guide, "id">) => Guide;
  updateGuide: (id: string, position: number) => void;
  removeGuide: (id: string) => void;
  setActiveGuide: (guide: Guide | null) => void;
  setIsDragging: (dragging: boolean) => void;
}

export interface IRulerContext {
  id: string;
  states: IRulerStates;
  methods: IRulerMethods;
}

export interface IRulerProviderProperties extends IReactChildren {}
