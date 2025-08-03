import React from "react";

import type { OTPFieldContextType } from "../types";

export const OTPFieldContext = React.createContext<OTPFieldContextType | null>(
  null
);
export const useOTPField = () => {
  const context = React.useContext(OTPFieldContext);

  if (!context) return null;
  return context;
};
