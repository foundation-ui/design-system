import React from "react";

function Icon({ children, ...restProps }: React.ComponentProps<"svg">) {
  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill={"currentColor"}
      {...restProps}
    >
      {children}
    </svg>
  );
}
Icon.displayName = "Icon";

export default Icon;
