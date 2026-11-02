import {
  IComponentVariant,
  IComponentShape,
  IComponentStyling,
} from "../../../../../types";

export interface IOTPFieldStates {
  otp: string[];
  activeIndex: number;
  length: number;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export interface IOTPFieldMethods {
  handleChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent) => void;
  handleClick: (index: number) => void;
  handlePaste: (e: React.ClipboardEvent) => void;
  handleFocus: (index: number) => void;
}

export interface IOTPFieldContext {
  id: string;
  states: IOTPFieldStates;
  methods: IOTPFieldMethods;
}

export interface IOTPFieldProviderProperties extends OTPFieldProps {}

export interface OTPFieldProps {
  name?: string;
  id?: string;
  children: React.ReactNode;
  length?: number;
  onComplete?: (value: string) => void;
}

export interface OTPFieldSlotProps
  extends IComponentVariant, IComponentStyling, IComponentShape {
  index: number;
}
