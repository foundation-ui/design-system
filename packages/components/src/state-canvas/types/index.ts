import React from "react";

export type ShapeType = "circle" | "triangle" | "square" | "diamond";
export type VariantTpe =
  | "analysis"
  | "connect"
  | "think"
  | "intense"
  | "ripple"
  | "converge"
  | "sweep-x"
  | "sweep-y"
  | "diagonal"
  | "corner";

export interface IParticle {
  gridX: number;
  gridY: number;
  opacity: number;
  targetOpacity: number;
  size: number;
  targetSize: number;
  flickerSpeed: number;
  scale: number;
  targetScale: number;
  gridCol: number;
  gridRow: number;
}

export interface IPathSegment {
  x: number;
  y: number;
}

export interface IConnection {
  startIndex: number;
  endIndex: number;
  progress: number;
  speed: number;
  opacity: number;
  path: IPathSegment[];
}

export interface IGridInfo {
  cols: number;
  rows: number;
  spacing: number;
}

export interface IStateCanvasProps extends React.ComponentProps<"div"> {}

export interface IWaveParticle {
  gridX: number;
  gridY: number;
  opacity: number;
  targetOpacity: number;
  size: number;
  targetSize: number;
  flickerSpeed: number;
  scale: number;
  targetScale: number;
  distance: number;
  baseSize: number;
  col: number;
  row: number;
}

export interface IWave {
  startTime: number;
}

export interface IWaveConfig {
  intervalMs: number;
  speed: number;
  width: number;
  getDistance: (col: number, row: number, cols: number, rows: number) => number;
  getMaxDistance: (cols: number, rows: number) => number;
}

export type TransferDirection = "down" | "up";

export interface ITransferWave {
  startTime: number;
  direction: TransferDirection;
  colOffset: number;
}

export interface IIntenseParticle extends IWaveParticle {
  distances: number[];
}

export interface IIntenseWave {
  startTime: number;
  centerIndex: number;
  isPowerPulse: boolean;
}

export interface IStateCanvasBaseProps {
  shape?: ShapeType;
  variant?: VariantTpe;
  /** Any CSS color. Defaults to white. */
  color?: string;
  speed?: number;
  children?: React.ReactNode;
}
