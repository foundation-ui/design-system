"use client";

import React from "react";

import { RotatingSpinner } from "./styles";
import type { IComponentSize } from "../../../../types";

interface SpinnerProperties extends IComponentSize {}

/**
 * Spinners are used to convey a pending state.
 *
 * @param {TextareaProps} props - The props for the Spinner component.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @returns {ReactElement} The Spinner component.
 */
export const Spinner = (props: SpinnerProperties) => {
  return <RotatingSpinner data-size={props.sizing ?? "medium"} />;
};
