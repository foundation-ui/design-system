"use client";

import React, { createContext, useContext } from "react";

import type { IOTPFieldContext, IOTPFieldProviderProperties } from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultOTPFieldContext: IOTPFieldContext = {
  id: "",
  states: {
    otp: Array.from({ length: 6 }, () => ""),
    activeIndex: 0,
    length: 6,
    inputRefs: { current: [] },
  },
  methods: {
    handleChange: noop,
    handleKeyDown: noop,
    handleClick: noop,
    handlePaste: noop,
    handleFocus: noop,
  },
};

const OTPFieldContext = createContext<IOTPFieldContext>(defaultOTPFieldContext);

export const useOTPField = (): IOTPFieldContext => useContext(OTPFieldContext);

export const OTPFieldProvider = ({
  children,
  length,
  onComplete,
}: IOTPFieldProviderProperties): React.JSX.Element => {
  const defaultLength = length ?? 6;

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = React.useState<string[]>(
    Array.from({ length: defaultLength }, () => ""),
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

  const handleClick = (index: number) => {
    const firstEmptyIndex = otp.findIndex((digit) => digit === "");
    const targetIndex =
      firstEmptyIndex === -1 ? defaultLength - 1 : firstEmptyIndex;

    setActiveIndex(targetIndex);
    inputRefs.current[targetIndex]?.focus();

    const timeout = setTimeout(
      () => inputRefs.current[targetIndex]?.select(),
      0,
    );

    return () => clearTimeout(timeout);
  };

  React.useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === defaultLength && onComplete) {
      onComplete(otpString);
    }
  }, [otp, defaultLength, onComplete]);

  const id = React.useId();

  return (
    <OTPFieldContext.Provider
      value={{
        id,
        states: {
          otp,
          activeIndex,
          length: defaultLength,
          inputRefs,
        },
        methods: {
          handleChange,
          handleKeyDown,
          handleFocus,
          handleClick,
          handlePaste,
        },
      }}
    >
      {children}
    </OTPFieldContext.Provider>
  );
};
