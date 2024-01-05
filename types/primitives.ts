export enum ComponentSizeEnum {
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
  Ghost = "ghost",
}
export enum KeyBindingEnum {
  Ctrl = "ctrlKey",
  Meta = "metaKey",
  Alt = "altKey",
  Shift = "shiftKey",
}

export type TComponentAPI = boolean | string | number | null;
export type TComponentSize =
  | ComponentSizeEnum.Small
  | ComponentSizeEnum.Medium
  | ComponentSizeEnum.Large;
export type TComponentVariant =
  | ComponentVariantEnum.Primary
  | ComponentVariantEnum.Secondary
  | ComponentVariantEnum.Tertiary
  | ComponentVariantEnum.Ghost;
export type TKeyBinding =
  | KeyBindingEnum.Ctrl
  | KeyBindingEnum.Meta
  | KeyBindingEnum.Alt
  | KeyBindingEnum.Shift;

export interface IComponentAPI {
  id: string;
  states: Record<string, TComponentAPI | Record<string, TComponentAPI>>;
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
