export type TDateSegmentType =
  | "day"
  | "month"
  | "year"
  | "hour"
  | "minute"
  | "literal";

export interface ISegment {
  type: TDateSegmentType;
  value: string;
}

export interface DateState {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
}

export const SegmentRanges: Record<
  Exclude<TDateSegmentType, "literal">,
  { min: number; max: (date: DateState) => number }
> = {
  day: { min: 1, max: () => 31 },
  month: { min: 1, max: () => 12 },
  year: { min: 1, max: () => 9999 },
  hour: { min: 0, max: () => 23 },
  minute: { min: 0, max: () => 59 },
};
