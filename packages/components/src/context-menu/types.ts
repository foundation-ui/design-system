import type React from "react";
import type { IComponentStyling } from "../../../../types";

export interface IContextMenuPoint {
  x: number;
  y: number;
}

export interface IContextMenuMenuProperties {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface IContextMenuOptions {
  controlled: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface IContextMenuStates {
  open: boolean;
  point: IContextMenuPoint;
  invocation: number;
}

export interface IContextMenuMethods {
  setOpen: (open: boolean) => void;
  openAt: (point: IContextMenuPoint) => void;
  sync: (open: boolean) => void;
  configure: (options: IContextMenuOptions) => void;
}

export interface IContextMenuItem extends React.ComponentProps<"li"> {
  radio?: boolean;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLLIElement>) => void;
}

export interface IContextMenuRefs {
  area: React.MutableRefObject<HTMLElement | null>;
  content: React.MutableRefObject<HTMLDivElement | null>;
}

export interface IContextMenuContext {
  id: string;
  states: IContextMenuStates;
  methods: IContextMenuMethods;
  refs: IContextMenuRefs;
}
