"use client";

import React from "react";

import {
  AnimatedSpinner,
  DitherContainer,
  DitherCell,
  AsciiContainer,
  RadarCell,
} from "./styles";

import type {
  LoaderBaseProperties,
  LoaderDitherProperties,
  LoaderSpinnerProperties,
} from "./types";

export interface LoaderComposition {
  Spinner: typeof LoaderSpinner;
  Dither: typeof LoaderDither;
  ASCII: typeof LoaderASCII;
  ASCIIBraille: typeof LoaderASCIIBraille;
  ASCIILine: typeof LoaderASCIILine;
  ASCIIBounce: typeof LoaderASCIIBounce;
  ASCIIBlocks: typeof LoaderASCIIBlocks;
}

/**
 * Loader component.
 *
 * @returns {ReactElement} The Loader component.
 */
const Loader = ({ children }: { children: React.ReactNode }) => {
  return children;
};
Loader.displayName = "Loader";

/**
 * LoaderSpinner component.
 *
 * @returns {ReactElement} The LoaderSpinner component.
 */
const LoaderSpinner = (props: LoaderSpinnerProperties) => {
  const { variant = "circle", sizing = "medium" } = props;

  return (
    <AnimatedSpinner data-variant={variant} data-size={sizing} role="status" />
  );
};
LoaderSpinner.displayName = "Loader.Spinner";

const BAYER_4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
/**
 * LoaderDither component.
 *
 * @returns {ReactElement} The LoaderDither component.
 */
const LoaderDither = (props: LoaderDitherProperties) => {
  const { sizing = "medium", ...restProps } = props;

  return (
    <DitherContainer data-size={sizing} role="status" {...restProps}>
      {BAYER_4.map((order, idx) => (
        <DitherCell key={idx} $order={order} $total={BAYER_4.length} />
      ))}
    </DitherContainer>
  );
};
LoaderDither.displayName = "Loader.Dither";

const ASCII_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
/**
 * LoaderASCII component.
 *
 * @returns {ReactElement} The LoaderASCII component.
 */
const LoaderASCII = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCII_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <AsciiContainer data-size={sizing} role="status" {...restProps}>
      {ASCII_FRAMES[frame]}
    </AsciiContainer>
  );
};
LoaderASCII.displayName = "Loader.ASCII";

const ASCIIBRAILLE_FRAMES = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];
/**
 * LoaderASCIIBraille component.
 *
 * @returns {ReactElement} The LoaderASCIIBraille component.
 */
const LoaderASCIIBraille = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCIIBRAILLE_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <AsciiContainer data-size={sizing} role="status" {...restProps}>
      {ASCIIBRAILLE_FRAMES[frame]}
    </AsciiContainer>
  );
};
LoaderASCIIBraille.displayName = "Loader.ASCIIBraille";

const ASCIILINE_FRAMES = ["|", "/", "-", "\\"];
/**
 * LoaderASCIILine component.
 *
 * @returns {ReactElement} The LoaderASCIILine component.
 */
const LoaderASCIILine = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCIILINE_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <AsciiContainer data-size={sizing} role="status" {...restProps}>
      {ASCIILINE_FRAMES[frame]}
    </AsciiContainer>
  );
};
LoaderASCIILine.displayName = "Loader.ASCIILine";

const ASCIIBOUNCE_FRAMES = ["⠁", "⠂", "⠄", "⡀", "⢀", "⠠", "⠐", "⠈"];
/**
 * LoaderASCIIBounce component.
 *
 * @returns {ReactElement} The LoaderASCIIBounce component.
 */
const LoaderASCIIBounce = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCIIBOUNCE_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <AsciiContainer data-size={sizing} role="status" {...restProps}>
      {ASCIIBOUNCE_FRAMES[frame]}
    </AsciiContainer>
  );
};
LoaderASCIIBounce.displayName = "Loader.ASCIIBounce";

const ASCIIBLOCKS_FRAMES = [
  "▁",
  "▂",
  "▃",
  "▄",
  "▅",
  "▆",
  "▇",
  "█",
  "▇",
  "▆",
  "▅",
  "▄",
  "▃",
  "▂",
];
/**
 * LoaderASCIIBlocks component.
 *
 * @returns {ReactElement} The LoaderASCIIBlocks component.
 */
const LoaderASCIIBlocks = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCIIBLOCKS_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <AsciiContainer data-size={sizing} role="status" {...restProps}>
      {ASCIIBLOCKS_FRAMES[frame]}
    </AsciiContainer>
  );
};
LoaderASCIIBlocks.displayName = "Loader.ASCIIBlocks";

/**
 * LoaderRadar component.
 *
 * @returns {ReactElement} The LoaderRadar component.
 */
const LoaderRadar = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const RADAR_GRID = 4;
  const RADAR_DEFAULT_DURATION = 1600;

  /**
   * Computes the clockwise angle (0 to 1, starting at 12 o'clock) of a cell
   * relative to the center of the grid.
   */
  const getRadarAngle = (index: number) => {
    const row = Math.floor(index / RADAR_GRID);
    const col = index % RADAR_GRID;
    const center = (RADAR_GRID - 1) / 2;
    const dx = col - center;
    const dy = row - center;
    const angle = Math.atan2(dx, -dy);
    const normalized = angle < 0 ? angle + 2 * Math.PI : angle;
    return normalized / (2 * Math.PI);
  };

  const RADAR_CELLS = Array.from(
    { length: RADAR_GRID * RADAR_GRID },
    (_, i) => ({
      index: i,
      angle: getRadarAngle(i),
    }),
  );

  const rotation = duration ?? RADAR_DEFAULT_DURATION;

  return (
    <DitherContainer data-size={sizing} role="status" {...restProps}>
      {RADAR_CELLS.map(({ index, angle }) => (
        <RadarCell
          key={index}
          $delay={-angle * rotation}
          $duration={rotation}
        />
      ))}
    </DitherContainer>
  );
};
LoaderRadar.displayName = "Loader.Radar";

Loader.Spinner = LoaderSpinner;
Loader.Dither = LoaderDither;
Loader.Radar = LoaderRadar;
Loader.ASCII = LoaderASCII;
Loader.ASCIIBraille = LoaderASCIIBraille;
Loader.ASCIILine = LoaderASCIILine;
Loader.ASCIIBounce = LoaderASCIIBounce;
Loader.ASCIIBlocks = LoaderASCIIBlocks;

export {
  Loader,
  LoaderSpinner,
  LoaderDither,
  LoaderRadar,
  LoaderASCII,
  LoaderASCIIBraille,
  LoaderASCIILine,
  LoaderASCIIBlocks,
};
