"use client";

import React from "react";

import { useOTPField, OTPFieldContext } from "./hooks";
import { OTPCell } from "./styles";

import type { OTPFieldProps, OTPFieldSlotProps } from "./types";

export interface IOTPFieldComposition {
  Slot: typeof OTPFieldSlot;
}

/**
 * A field for entering one-time passwords.
 * This component holds the state and logic for the entire OTP input group.
 *
 * @param {OTPFieldProps} props - The props for the OTPField component.
 * @param {ReactNode} props.children - The content to be rendered, typically OTPField.Group.
 * @param {number} [props.length=6] - The number of characters in the OTP.
 * @param {function} [props.onComplete] - Callback fired when all inputs are filled.
 * @returns {ReactElement} The OTPField component.
 */
const OTPField = ({ children, length, onComplete }: OTPFieldProps) => {
  const defaultLength = length ?? 6;

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = React.useState<string[]>(
    Array.from({ length: defaultLength }, () => "")
  );
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < defaultLength - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    /**
     * Keyboard Navigation Behavior for OTP Field:
     *
     * Backspace/Delete:
     * - If current slot has a value: clear it and stay in current slot
     * - If current slot is empty: move to previous slot and clear its value
     *
     * Arrow Keys, Home, End:
     * - Prevent navigation when current slot is empty
     * - Allow navigation only when current slot has a value
     *
     * Tab:
     * - Prevent forward navigation (Tab) when current slot is empty
     * - Allow backward navigation (Shift+Tab) regardless of slot state
     **/

    const enabledBehaviorKeys = ["Backspace", "Delete"];
    const disabledBehaviorKeys = [
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    if (enabledBehaviorKeys.includes(e.key)) {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        return;
      }

      if (index > 0) {
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      }

      return;
    }

    if (disabledBehaviorKeys.includes(e.key) && !otp[index]) {
      e.preventDefault();
    }
  };

  const handleFocus = (index: number) => setActiveIndex(index);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteArray = pasteData.slice(0, defaultLength).split("");

    const newOtp = [...otp];
    pasteArray.forEach((char, index) => {
      if (index < defaultLength) newOtp[index] = char;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pasteArray.length, defaultLength - 1);
    setActiveIndex(nextIndex);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleClick = () => {
    const firstEmptyIndex = otp.findIndex((digit) => digit === "");
    const targetIndex =
      firstEmptyIndex === -1 ? defaultLength - 1 : firstEmptyIndex;

    setActiveIndex(targetIndex);
    inputRefs.current[targetIndex]?.focus();

    /**
     * setTimeout is used to prevent the input from being selected
     * when the focus is set and is set to 0 to select the correct slot immediately
     */
    const timeout = setTimeout(
      () => inputRefs.current[targetIndex]?.select(),
      0
    );

    return () => clearTimeout(timeout);
  };

  React.useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === defaultLength && onComplete) {
      onComplete(otpString);
    }
  }, [otp, defaultLength, onComplete]);

  const contextValue = React.useMemo(() => {
    return {
      otp,
      activeIndex,
      inputRefs,
      length: defaultLength,
      handleChange,
      handleKeyDown,
      handleFocus,
      handleClick,
      handlePaste,
    };
  }, [
    otp,
    activeIndex,
    inputRefs,
    defaultLength,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleClick,
    handlePaste,
  ]);

  return (
    <OTPFieldContext.Provider value={contextValue}>
      {children}
    </OTPFieldContext.Provider>
  );
};
OTPField.displayName = "OTPField";

/**
 * A container for the OTP input slots.
 *
 * @param {React.HTMLAttributes<HTMLSpanElement>} props - The props for the OTPField.Group component.
 * @returns {ReactElement} The OTPField.Group component.
 */
const OTPFieldGroup = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ ...props }, ref) => {
  return (
    <span ref={ref} className="flex g-medium-10 align-center" {...props} />
  );
});
OTPFieldGroup.displayName = "OTPField.Group";

/**
 * Represents a single character input slot in the OTP field.
 *
 * @param {OTPFieldSlotProps & React.InputHTMLAttributes<HTMLInputElement>} props - The props for the OTPField.Slot component.
 * @param {number} props.index - The zero-based index of the slot.
 * @returns {ReactElement} The OTPField.Slot component.
 */
const OTPFieldSlot = ({
  index,
  ...props
}: OTPFieldSlotProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const context = useOTPField();
  if (!context) return null;

  const {
    otp,
    activeIndex,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleClick,
    handlePaste,
  } = context;

  return (
    <OTPCell
      ref={(el) => (inputRefs.current[index] = el)}
      type="text"
      data-testid="otp-field-slot"
      data-active={activeIndex === index}
      autoComplete="one-time-code"
      maxLength={1}
      value={otp[index] || ""}
      placeholder={props.placeholder || "-"}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(index, e)}
      onFocus={() => handleFocus(index)}
      onMouseDown={() => handleClick(index)}
      onClick={() => handleClick(index)}
      onPaste={handlePaste}
      {...props}
    />
  );
};
OTPFieldSlot.displayName = "OTPField.Slot";

OTPField.Group = OTPFieldGroup;
OTPField.Slot = OTPFieldSlot;
export { OTPField, OTPFieldSlot };
