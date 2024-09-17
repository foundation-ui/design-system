import React from "react";

export const useDisabledScroll = (state: boolean) => {
  const overflow = state ? "hidden" : "";

  React.useEffect(() => {
    document.body.style.overflowY = overflow;
  }, [state]);

  return {
    overflow,
    disabled: state,
  };
};
