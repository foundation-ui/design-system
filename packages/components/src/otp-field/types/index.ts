export interface OTPFieldContextType {
  otp: string[];
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  length: number;
  activeIndex: number;
  handleChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent) => void;
  handleClick: (index: number) => void;
  handlePaste: (e: React.ClipboardEvent) => void;
  handleFocus: (index: number) => void;
}

export interface OTPFieldProps {
  name?: string;
  id?: string;
  children: React.ReactNode;
  length?: number;
  onComplete?: (value: string) => void;
}

export interface OTPFieldSlotProps {
  index: number;
}
