"use client";

import React from "react";

import { AnalysisCanvas, IntenseCanvas, WaveCanvas } from "./components/parts";
import { AnalysisWrapper, Content } from "./styles";

import { DEFAULT_COLOR, WAVE_CONFIGS } from "./constants";

import type { IStateCanvasProps, IStateCanvasBaseProps } from "./types";

export interface IStateCanvasComposition {
  Variant: typeof StateCanvasVariant;
}

const StateCanvas = ({
  children,
  ...restProps
}: IStateCanvasProps): React.ReactElement => {
  return <AnalysisWrapper {...restProps}>{children}</AnalysisWrapper>;
};
StateCanvas.displayName = "StateCanvas";

const StateCanvasVariant = ({
  shape = "circle",
  color = DEFAULT_COLOR,
  speed = 1,
  variant = "analysis",
  children,
}: IStateCanvasBaseProps): React.ReactElement => {
  const props = { shape, color, speed };

  const renderCanvas = (): React.ReactElement => {
    if (variant === "analysis") return <AnalysisCanvas {...props} />;
    if (variant === "intense") return <IntenseCanvas {...props} />;
    return <WaveCanvas config={WAVE_CONFIGS[variant]} {...props} />;
  };

  return (
    <React.Fragment>
      {renderCanvas()}
      {children && <Content>{children}</Content>}
    </React.Fragment>
  );
};
StateCanvasVariant.displayName = "StateCanvas.Variant";

StateCanvas.Variant = StateCanvasVariant;

export { StateCanvas, StateCanvasVariant };
