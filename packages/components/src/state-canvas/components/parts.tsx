"use client";

import React from "react";

import {
  useAnalysisAnimation,
  useIntenseAnimation,
  useWaveAnimation,
} from "../hooks";

import { Canvas } from "../styles";

import type { IWaveConfig, ShapeType } from "../types";

interface ICanvasProps {
  shape: ShapeType;
  color: string;
  speed: number;
}

export const AnalysisCanvas = ({ shape, color, speed }: ICanvasProps) => (
  <Canvas ref={useAnalysisAnimation(shape, color, speed)} />
);

export const IntenseCanvas = ({ shape, color, speed }: ICanvasProps) => (
  <Canvas ref={useIntenseAnimation(shape, color, speed)} />
);

export const WaveCanvas = ({
  config,
  shape,
  color,
  speed,
}: ICanvasProps & { config: IWaveConfig }) => (
  <Canvas ref={useWaveAnimation(shape, config, color, speed)} />
);
