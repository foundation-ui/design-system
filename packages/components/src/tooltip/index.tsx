"use client";

import React from "react";

import { useFloatingPlacement } from "@usefui/hooks";

import { ContentBox, ContentWrapper, ShortcutBox } from "./styles";

import { applyDataState } from "../utils";
import {
  ComponentSideEnum,
  ComponentSizeEnum,
  ComponentVariantEnum,
} from "../types";
import type { ITooltipProperties, TooltipPlacement } from "./types";

/**
 * Tooltips are used to convey additional information while hovering a component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is short and readable.
 *
 * @param {ITooltipProperties} props - The props for the Tooltip component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {number} props.delay - The delay in ms awaited until the Tooltip is displayed. Default to 200ms.
 * @param {string} props.content - The additional content to be rendered inside the Tooltip.
 * @param {number} props.gap - Distance (px) between the trigger and the Tooltip.
 * @param {number} props.margin - Minimum distance (px) kept between the Tooltip and the viewport edges.
 * @param {string} props.hint - The additional content to be rendered inside the Tooltip, beside the content.
 * @param {string} props.variant - The style definition used by the component.
 * @param {ComponentSizeEnum} props.sizing - The size of the component. Defaults to "medium".
 * @param {ReactNode} props.children - The content to be rendered as Tooltip children.
 * @returns {ReactElement} The Tooltip component.
 */
const Tooltip = (props: ITooltipProperties) => {
  const {
    delay = 200,
    content,
    hint,
    gap = 4,
    margin = 4,
    variant = ComponentVariantEnum.Primary,
    sizing = ComponentSizeEnum.Medium,
    children,
    ...restProps
  } = props;

  const [visible, setVisible] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLSpanElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const placement = useFloatingPlacement({
    enabled: visible,
    getTriggerRect: () => containerRef.current?.getBoundingClientRect(),
    floatingRef: contentRef,
    gap,
    margin,
    deps: [content, hint, sizing],
  });

  const showTooltip = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hideTooltip = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <ContentBox
      ref={containerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      {...restProps}
    >
      {children}
      {visible && (
        <ContentWrapper
          ref={contentRef}
          className="flex align-center g-medium-10"
          style={{
            position: "fixed",
            top: placement?.top ?? 0,
            left: placement?.left ?? 0,
            visibility: placement ? "visible" : "hidden",
          }}
          role="tooltip"
          data-state={applyDataState(visible)}
          data-raw={Boolean(restProps.raw)}
          data-variant={variant}
          data-size={sizing}
          data-side={placement?.align ?? ComponentSideEnum.Left}
          data-align={placement?.align ?? ComponentSideEnum.Left}
        >
          <span>{content}</span>
          {hint && (
            <ShortcutBox data-variant={variant ?? ComponentVariantEnum.Primary}>
              {hint}
            </ShortcutBox>
          )}
        </ContentWrapper>
      )}
    </ContentBox>
  );
};
Tooltip.displayName = "Tooltip";

export { Tooltip };
