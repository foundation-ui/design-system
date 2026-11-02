"use client";

import React from "react";

import { Button } from "../";
import type { ActionSwapCopyProperties, ActionSwapProperties } from "./types";

export interface IActionSwapComposition {
  Copy: typeof ActionSwapCopy;
}

/**
 * ActionSwap is used to swap between two actions on click, such as copy buttons.
 *
 * **Best practices:**
 *
 * - Provide clear labels for both actions.
 * - Keep the delay short enough to feel responsive.
 *
 * @param {ActionSwapProperties} props - The props for the ActionSwap component.
 * @param {number} props.delay - The delay before reverting to the initial action. Defaults to `1000`.
 * @param {ReactNode[]} props.actions - The actions to swap between.
 * @param {ReactNode} props.children - The content to be rendered inside the action swap.
 * @returns {ReactElement} The ActionSwap component.
 */
const ActionSwap = ({
  delay = 1000,
  actions,
  onClick,
  children,
  ...restProps
}: ActionSwapProperties) => {
  const timerRef = React.useRef<number | null>(null);
  const [trigerred, setTrigerred] = React.useState(false);

  const handleActionSwap = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (onClick) onClick(event);
    setTrigerred(true);

    if (timerRef.current != null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setTrigerred(false), delay);
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <Button onClick={handleActionSwap} {...restProps}>
      {trigerred ? actions.at(-1) : actions.at(0)}
    </Button>
  );
};
ActionSwap.displayName = "ActionSwap";

/**
 * ActionSwap.Copy is used to copy a value to the clipboard with swap feedback.
 *
 * **Best practices:**
 *
 * - Provide the value to copy via the value prop.
 * - Keep labels concise.
 *
 * @param {ActionSwapCopyProperties} props - The props for the ActionSwap.Copy component.
 * @param {number} props.delay - The delay before reverting. Defaults to `1000`.
 * @param {string} props.value - The value to copy to the clipboard.
 * @param {ReactNode} props.children - The content to be rendered inside the action swap.
 * @returns {ReactElement} The ActionSwap.Copy component.
 */
const ActionSwapCopy = ({
  delay = 1000,
  actions,
  value,
  onClick,
  children,
  ...restProps
}: ActionSwapCopyProperties) => {
  const copyToClipboard = async () => {
    if (value == null) return;

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();

      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  return (
    <ActionSwap
      onClick={copyToClipboard}
      actions={actions ?? ["Copy", "Copied"]}
      {...restProps}
    />
  );
};
ActionSwapCopy.displayName = "ActionSwap.Copy";

ActionSwap.Copy = ActionSwapCopy;
export { ActionSwap, ActionSwapCopy };
