"use client";

import React from "react";

import { AnimatedSpinner } from "./styles";
import type { IComponentSize } from "../../../../types";

type SpinnerVariant = "circle" | "circle-filled";

interface SpinnerProperties extends IComponentSize {
  variant?: SpinnerVariant;
}

/**
 * Spinners are used to convey a loading state information.
 *
 * @param {SpinnerProperties} props - The props for the Spinner component.
 * @param {string} props.sizing - The size of the component. Defaults to `medium`.
 * @param {SpinnerVariant} props.variant - The spinner animation variant. Defaults to `circle`.
 * @returns {ReactElement} The Spinner component.
 */
export const Spinner = (props: SpinnerProperties) => {
  return (
    <AnimatedSpinner
      data-variant={props?.variant ?? "circle"}
      data-size={props?.sizing ?? "medium"}
    />
  );
};
