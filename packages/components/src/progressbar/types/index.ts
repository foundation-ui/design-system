export type ProgressBarProps = {
  /** Amount consumed so far. */
  consumption: number;
  /** Amount still remaining. When 0, the bar is shown as empty (red). */
  remaining: number;
  /** Ratio between 0 and 1 (e.g. 0.42 for 42%). */
  percentage: number;
  /** Ratio at or above which the bar turns orange (warning). */
  threshold?: number;
};

export type RangeProps = {
  $percentage: number;
};
