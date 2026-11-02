"use client";

import React from "react";

import {
  AnimatedSpinner,
  DitherContainer,
  DitherCell,
  AsciiContainer,
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
  ASCIILaine: typeof LoaderASCIILine;
  ASCIIBounce: typeof LoaderASCIIBounce;
  ASCIIBlocks: typeof LoaderASCIIBlocks;
}

const Loader = ({ children }: { children: React.ReactNode }) => {
  return children;
};
Loader.displayName = "Loader";

const LoaderSpinner = (props: LoaderSpinnerProperties) => {
  const { variant = "circle", sizing = "medium" } = props;

  return (
    <AnimatedSpinner data-variant={variant} data-size={sizing} role="status" />
  );
};
LoaderSpinner.displayName = "Loader.Spinner";

const BAYER_4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
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
const LoaderASCII = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCIILINE_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AsciiContainer data-size={sizing} role="status" {...restProps}>
      {ASCII_FRAMES[frame]}
    </AsciiContainer>
  );
};
LoaderASCII.displayName = "Loader.ASCII";

const ASCIIBRAILLE_FRAMES = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];
const LoaderASCIIBraille = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCIILINE_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AsciiContainer data-size={sizing} role="status" {...restProps}>
      {ASCIIBRAILLE_FRAMES[frame]}
    </AsciiContainer>
  );
};
LoaderASCIIBraille.displayName = "Loader.ASCIIBraille";

const ASCIILINE_FRAMES = ["|", "/", "-", "\\"];
const LoaderASCIILine = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCIILINE_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AsciiContainer data-size={sizing} role="status" {...restProps}>
      {ASCIILINE_FRAMES[frame]}
    </AsciiContainer>
  );
};
LoaderASCIILine.displayName = "Loader.ASCIILine";

const ASCIIBOUNCE_FRAMES = ["⠁", "⠂", "⠄", "⡀", "⢀", "⠠", "⠐", "⠈"];
const LoaderASCIIBounce = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCIIBOUNCE_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, []);

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
const LoaderASCIIBlocks = (props: LoaderBaseProperties) => {
  const { duration, sizing = "medium", ...restProps } = props;

  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCIIBLOCKS_FRAMES.length);
    }, duration ?? 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AsciiContainer data-size={sizing} role="status" {...restProps}>
      {ASCIIBLOCKS_FRAMES[frame]}
    </AsciiContainer>
  );
};
LoaderASCIIBlocks.displayName = "Loader.ASCIIBlocks";

Loader.Spinner = LoaderSpinner;
Loader.Dither = LoaderDither;
Loader.ASCII = LoaderASCII;
Loader.ASCIIBraille = LoaderASCIIBraille;
Loader.ASCIILine = LoaderASCIILine;
Loader.ASCIIBounce = LoaderASCIIBounce;
Loader.ASCIIBlocks = LoaderASCIIBlocks;

export {
  Loader,
  LoaderSpinner,
  LoaderDither,
  LoaderASCII,
  LoaderASCIIBraille,
  LoaderASCIILine,
  LoaderASCIIBlocks,
};
