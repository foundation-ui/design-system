export enum ComponentSizeEnum {
  None = "none",
  Small = "small",
  Medium = "medium",
  Large = "large",
}
export enum ComponentSideEnum {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
}
export enum ComponentVariantEnum {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Border = "border",
  Mono = "mono",
  Ghost = "ghost",
}
export enum ComponentHeightEnum {
  Fullscreen = "fullscreen",
  Display = "display",
  Auto = "auto",
}

export enum KeyBindingEnum {
  Ctrl = "ctrlKey",
  Meta = "metaKey",
  Alt = "altKey",
  Shift = "shiftKey",
}

export type TKeyboardLayout =
  | "QWERTY"
  | "AZERTY"
  | "BÉPO"
  | "JCUKEN"
  | "QGMLWY"
  | "HCESAR";
export type TComponentHeight = "fullscreen" | "display" | "auto";
export type TComponentAPI = boolean | string | number | null | unknown;
export type TComponentSize = "small" | "medium" | "large";
export type TComponentSide = "top" | "right" | "bottom" | "left";
export type TComponentVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "mono"
  | "border"
  | "ghost";
export type TKeyBinding = "ctrlKey" | "metaKey" | "altKey" | "shiftKey";
export type TFrequencyLabels = "greater-than" | "less-than" | "equals-to";
export interface IComponentAPI {
  id: string;
  states: Record<string, TComponentAPI | Record<string, TComponentAPI> | any>;
  methods: Record<string, (args?: TComponentAPI | any) => void>;
}
export interface IComponentStyling {
  raw?: boolean;
}
export interface IComponentSize {
  sizing?: TComponentSize;
}
export interface IComponentVariant {
  variant?: TComponentVariant;
}
export interface IComponentControlProperties {
  shortcut?: boolean;
  hotkey?: string;
  bindkey?: TKeyBinding;
}
export interface IComponentSpacing {
  spacing?: TComponentSize;
}
