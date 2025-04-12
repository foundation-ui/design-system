"use client";

import React from "react";

import { ContentBox, ContentWrapper } from "./styles";

import { applyDataState } from "../utils";
import { ComponentSideEnum, IComponentStyling } from "../../../../types";

interface ITooltipProperties
  extends IComponentStyling,
    React.ComponentProps<"span"> {
  delay?: number;
  content: string;
  children: React.ReactNode;
}

/**
 * Toolpire are used to convey additional information while hovering a component.
 *
 * **Best practices:**
 *
 * - Ensure that the content is short and readable.
 *
 * @param {ITooltipProperties} props - The props for the Tooltip component.
 * @param {boolean} props.raw - Define whether the component is styled or not.
 * @param {number} props.delay - The delay in ms awaited until the Tooltip is displayed. Default to 200ms.
 * @param {string} props.content - The additional content to be rendered inside the Tooltip.
 * @param {ReactNode} props.children - The content to be rendered as Tooltip children.
 * @returns {ReactElement} The Tooltip component.
 */
const Tooltip = ({
  delay = 200,
  content,
  children,
  ...restProps
}: ITooltipProperties) => {
  const [visible, setVisible] = React.useState(false);
  const [triggerProps, setTriggerProps] = React.useState<{
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [contentProps, setContentProps] = React.useState<{
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const mounted = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const contentRect = () => contentRef?.current?.getBoundingClientRect();
  const bodyRect = React.useCallback(() => {
    if (typeof document !== "undefined") {
      return document.body.getBoundingClientRect();
    }
  }, []);

  const positions = {
    btt: `calc((${triggerProps?.top}px - ${contentProps?.height}px) - (var(--measurement-medium-10)))`,
    ttb: `calc((${triggerProps?.top}px + ${triggerProps?.height}px) + var(--measurement-medium-10))`,
    ltr: `${triggerProps?.left}px`,
    rtl: `calc(${triggerProps?.left}px - (${contentProps?.width}px - ${triggerProps?.width}px))`,
  };
  const dimensions = {
    body_width: bodyRect()?.width,
    body_height: bodyRect()?.height,
    content_width: contentProps?.width,
    content_height: contentProps?.height,
    content_left: contentProps?.left,
    content_bottom: contentProps?.bottom,
  };

  const hasEnoughHorizontalSpace =
    Number(dimensions.body_width) - Number(dimensions.content_left) >
    Number(dimensions.content_width) * 1.1;

  const hasEnoughVerticalSpace =
    Number(dimensions.body_height) - Number(dimensions.content_bottom) >
    Number(dimensions.content_height) * 0.9;

  const showTooltip = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hideTooltip = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTriggerProps({
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      showTooltip();
    }
  }, [showTooltip]);

  const handleMouseLeave = React.useCallback(
    () => hideTooltip(),
    [hideTooltip]
  );

  React.useEffect(() => {
    mounted.current = true;

    setContentProps &&
      setContentProps({
        top: Number(contentRect()?.top),
        right: Number(contentRect()?.right),
        bottom: Number(contentRect()?.bottom),
        left: Number(contentRect()?.left),
        width: Number(contentRect()?.width),
        height: Number(contentRect()?.height),
      });

    return () => {
      mounted.current = false;
    };
  }, [visible]);

  return (
    <ContentBox
      ref={containerRef}
      style={{ display: "inline-block", position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restProps}
    >
      {children}
      {visible && (
        <ContentWrapper
          ref={contentRef}
          style={{
            top: hasEnoughVerticalSpace ? positions.ttb : positions.btt,
            left: hasEnoughHorizontalSpace ? positions.ltr : positions.rtl,
            position: "fixed",
          }}
          role="tooltip"
          data-state={applyDataState(visible)}
          data-raw={Boolean(restProps.raw)}
          data-side={
            hasEnoughHorizontalSpace
              ? ComponentSideEnum.Left
              : ComponentSideEnum.Right
          }
          data-align={
            hasEnoughHorizontalSpace
              ? ComponentSideEnum.Left
              : ComponentSideEnum.Right
          }
        >
          <div>{content}</div>
        </ContentWrapper>
      )}
    </ContentBox>
  );
};
Tooltip.displayName = "Tooltip";

export { Tooltip };
