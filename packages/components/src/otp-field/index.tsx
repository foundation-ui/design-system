"use client";

import React from "react";

import { useOTPField, OTPFieldProvider } from "./hooks";
import { OTPCell } from "./styles";

import type { OTPFieldProps, OTPFieldSlotProps } from "./types";
import { ComponentShapeEnum } from "../../../../types";

export interface IOTPFieldComposition {
  Slot: typeof OTPFieldSlot;
}

/**
 * A field for entering one-time passwords.
 *
 * @param {OTPFieldProps} props - The props for the OTPField component.
 * @param {ReactNode} props.children - The content to be rendered, typically OTPField.Group.
 * @param {number} [props.length=6] - The number of characters in the OTP.
 * @param {function} [props.onComplete] - Callback fired when all inputs are filled.
 * @returns {ReactElement} The OTPField component.
 */
const OTPField = (props: OTPFieldProps) => {
  const { children, ...restProps } = props;
  return <OTPFieldProvider {...restProps}>{children}</OTPFieldProvider>;
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
  shape,
  raw,
  ...props
}: OTPFieldSlotProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const context = useOTPField();
  const { states, methods } = context;
  const { otp, activeIndex, inputRefs } = states;
  const { handleChange, handleKeyDown, handleFocus, handleClick, handlePaste } =
    methods;

  return (
    <OTPCell
      ref={(el) => {
        inputRefs.current[index] = el;
      }}
      type="text"
      data-testid="otp-field-slot"
      data-active={activeIndex === index}
      data-shape={shape ?? ComponentShapeEnum.Smooth}
      data-raw={Boolean(raw)}
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
