import type * as React from "react";
import type {
  IComponentShape,
  IComponentSize,
  IComponentStyling,
  IComponentVariant,
} from "../../../../../types";

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

export enum MetaVariantEnum {
  Default = "default",
  Hint = "hint",
  Emphasis = "emphasis",
  Error = "error",
}

export type TMetaVariant = "default" | "hint" | "emphasis" | "error";

export interface IField
  extends
    React.ComponentProps<"input">,
    IComponentSize,
    IComponentVariant,
    IComponentShape,
    IComponentStyling {
  hint?: string;
  error?: string;
  /** Static text rendered at the end of the input. */
  suffix?: string;
  /** Renders increment/decrement chevrons at the end of the input. */
  controls?: boolean;
}

export interface IFieldLabel
  extends React.ComponentProps<"label">, IComponentStyling {
  optional?: boolean;
}

export interface IFieldMeta
  extends React.ComponentProps<"small">, IComponentStyling {
  variant?: TMetaVariant;
}

export interface IFieldNumber extends Omit<IField, "type"> {
  controls?: boolean;
  suffix?: string;
}

export interface IFieldDate
  extends
    IComponentSize,
    IComponentVariant,
    IComponentShape,
    IComponentStyling {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  hint?: string;
  error?: string;
  locale?: string;
  withTime?: boolean;
  disabled?: boolean;
  id?: string;
  suffix?: string;
}

export interface IFieldCurrency extends Omit<
  IField,
  "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
> {
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;
  /** ISO 4217 currency code. Defaults to `EUR`. */
  currency?: string;
  /** BCP 47 locale tag. Defaults to browser locale. */
  locale?: string;
  suffix?: string;

  min?: number;
  max?: number;
  step?: number;
  allowNegative?: boolean;
}

export interface IFieldFile extends Omit<IField, "type" | "children"> {
  trigger?: React.ReactNode;
  onFileChange?: (files: FileList | null) => void;
}

export type PrivacyType = "password" | "text";

export interface IFieldPassword extends IField {
  defaultType?: PrivacyType;
}

export interface IFieldRange
  extends
    Omit<
      React.ComponentProps<"input">,
      "type" | "value" | "defaultValue" | "onChange"
    >,
    IComponentStyling,
    IComponentSize,
    IComponentShape {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  showValue?: boolean;
  hint?: string;
  error?: string;
}

export interface IFieldTag
  extends
    IComponentSize,
    IComponentVariant,
    IComponentShape,
    IComponentStyling {
  value?: string[];
  defaultValue?: string[];
  allowed?: string[];
  onChange?: (tags: string[]) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
}

export interface IFieldAddon extends IComponentVariant, IComponentShape {
  raw?: boolean;
  error?: string;
  suffix?: string;
  controls?: boolean;
  onStep?: (direction: "up" | "down") => void;
}
