"use client";

import React from "react";
import { RangeContainer, RangeSegment } from "./styles";
import type { ProgressBarProps } from "./types";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const ProgressBar = ({
  consumption,
  remaining,
  percentage,
  threshold = 0.3,
}: ProgressBarProps) => {
  const ratio = Number.isFinite(percentage) ? clamp(percentage, 0, 1) : 0;
  const isEmpty = Number(remaining) === 0;
  const isThreshold = !isEmpty && ratio >= threshold;

  return (
    <RangeContainer
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      aria-valuetext={`${consumption} used, ${remaining} remaining`}
    >
      <RangeSegment
        $percentage={ratio * 100}
        data-empty={isEmpty}
        data-threshold={isThreshold}
      />
    </RangeContainer>
  );
};

ProgressBar.displayName = "ProgressBar";
