import React from "react";
// import PropTypes from 'prop-types';
// import { Base } from './styles/Button.styles';
import { TSize } from "../../../../../types";

/**
 * Buttons are used to initialize an action. Button labels express what action will
 * occur when the user interacts with it.
 *
 * **Best practices:**
 *
 * - Define the hierarchy of buttons with different variants.
 * - Button label must be short and understandable.
 */
export const Button = (props: React.ComponentPropsWithRef<"button">) => {
  const { children, ...restProps } = props;

  return (
    <button
      role="button"
      type="button"
      tabIndex={0}
      aria-disabled={props.disabled || "false"}
      {...restProps}
    >
      {children}
    </button>
  );
};
Button.displayName = "Button";
Button.defaultProps = {};
// Button.propTypes = {
//   size: PropTypes.oneOf(["xsmall", "small", "medium", "large"]),
//   shape: PropTypes.oneOf(["rounded"]),
//   disabled: PropTypes.bool,
//   onClick: PropTypes.func,
// };
