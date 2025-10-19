"use client";

import React from "react";

import { Tooltip, Button } from "../";
import type { IButtonProperties } from "../";

type TooltipValueProperties = {
  copyLabel?: string;
  copiedLabel?: string;
};
interface CopyButtonProperties extends IButtonProperties {
  delay?: number;
  value: string;
  tooltip?: TooltipValueProperties;
}

/**
 * CopyButton are used to copy stored values when clicked.
 *
 * @param {IButtonProperties} props - The props for the CopyButton component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {boolean} props.rawicon - Define whether the component is styles its svg children.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to `medium`.
 * @param {string} props.variant - The style definition used by the component.
 * @param {string} props.value - The value copied when the CopyButton is clicked.
 * @param {number} props.delay - The delay used to rendered the state change.
 * @param {TooltipValueProperties} props.tooltip - The values used to convey the copy state.
 * @param {ReactNode} props.children - The content to be rendered inside the CopyButton.
 * @returns {ReactElement} The CopyButton component.
 */
export const CopyButton = ({
  value,
  delay,
  tooltip,
  children,
  ...restProps
}: CopyButtonProperties) => {
  const timerRef = React.useRef<number | null>(null);
  const [copied, setCopied] = React.useState(false);

  const tooltipLabels = React.useMemo(() => {
    return {
      copy: tooltip?.copyLabel ?? "Copy",
      copied: tooltip?.copiedLabel ?? "Copied!",
    };
  }, [tooltip]);

  const copyToClipboard = async () => {
    if (value == null) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Best-effort fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();

      try {
        document.execCommand("copy");
        setCopied(true);
      } finally {
        document.body.removeChild(ta);
      }
    }

    if (timerRef.current != null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), delay ?? 1000);
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
    <Tooltip content={copied ? tooltipLabels.copied : tooltipLabels.copy}>
      <Button
        data-testId="copy-code"
        aria-label="copy-code"
        disabled={value == null}
        aria-disabled={value == null}
        variant={restProps?.variant ?? "ghost"}
        onClick={copyToClipboard}
        {...restProps}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
CopyButton.displayName = "CopyButton";
