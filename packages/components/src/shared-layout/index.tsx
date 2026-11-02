"use client";

import React from "react";
import {
  SharedLayoutWrapper,
  SharedLayoutPill,
  SharedLayoutItemWrapper,
  SharedLayoutContent,
} from "./styles";
import { useSharedLayout, SharedLayoutProvider } from "./hooks";
import { IComponentStyling, IReactChildren } from "../../../../types";

import type { SharedLayoutElementType } from "./hooks";

export interface ISharedLayoutProperties
  extends
    IComponentStyling,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: SharedLayoutElementType;
  /** Horizontal inset of the pill relative to each item (px). Defaults to 16. */
  inset?: number;
  children: React.ReactNode;
}

export interface ISharedLayoutItemProperties extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface ISharedLayoutComposition {
  Root: typeof SharedLayoutRoot;
  Item: typeof SharedLayoutItem;
}

/**
 * SharedLayout displays a single highlight that follows the hovered or focused item.
 *
 * **Best practices:**
 *
 * - Wrap it in `SharedLayout.Root` and use `SharedLayout.Item` as direct children.
 * - Use `as="ul"` for lists of links so the semantics are preserved.
 *
 * @param {ISharedLayoutProperties} props - The props for the SharedLayout component.
 * @param {boolean} props.raw - Whether the layout is styled or not.
 * @param {"div" | "ul"} props.as - The semantic container. Defaults to "div".
 * @param {number} props.inset - The horizontal inset of the highlight in px. Defaults to 16.
 * @param {ReactNode} props.children - The items to be rendered inside the layout.
 * @returns {ReactElement} The SharedLayout component.
 */
const SharedLayout = (props: ISharedLayoutProperties) => {
  const {
    raw,
    as = "div",
    inset = 16,
    children,
    style,
    onMouseLeave,
    onBlur,
    ...restProps
  } = props;
  const { states, methods } = useSharedLayout();

  const { pill } = states;
  const { applyAs } = methods;

  // Items read the container type from the provider to pick div or li.
  React.useLayoutEffect(() => {
    applyAs?.(as);
  }, [as, applyAs]);

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    methods.setHovering?.(false);
    // Keep the pill on a focused item so keyboard position stays visible.
    if (!event.currentTarget.contains(document.activeElement)) methods.hide?.();
    onMouseLeave?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (
      !methods.isHovering?.() &&
      !(next instanceof Node && event.currentTarget.contains(next))
    ) {
      methods.hide?.();
    }
    onBlur?.(event);
  };

  return (
    <SharedLayoutWrapper
      as={as}
      data-raw={Boolean(raw)}
      data-as={as}
      style={
        {
          ...style,
          "--shared-layout-inset": `${inset}px`,
        } as React.CSSProperties
      }
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      {...restProps}
    >
      <SharedLayoutPill
        aria-hidden="true"
        data-visible={pill?.visible ?? false}
        data-moving={pill?.moving ?? false}
        style={
          {
            "--shared-layout-top": `${pill?.top ?? 0}px`,
            "--shared-layout-height": `${pill?.height ?? 0}px`,
          } as React.CSSProperties
        }
      />
      {children}
    </SharedLayoutWrapper>
  );
};
SharedLayout.displayName = "SharedLayout";

const SharedLayoutRoot = ({ children }: IReactChildren) => {
  return <SharedLayoutProvider>{children}</SharedLayoutProvider>;
};
SharedLayoutRoot.displayName = "SharedLayout.Root";

/**
 * SharedLayout Items are the elements the shared highlight moves between.
 *
 * **Best practices:**
 *
 * - Only use inside a `SharedLayout.Root`.
 * - Place interactive content (links, buttons) inside so keyboard users get the highlight too.
 *
 * @param {ISharedLayoutItemProperties} props - The props for the SharedLayout Item component.
 * @param {ReactNode} props.children - The content to be rendered inside the item.
 * @returns {ReactElement} The SharedLayout Item component.
 */
const SharedLayoutItem = (
  props: ISharedLayoutItemProperties,
): React.ReactElement => {
  const { children, onMouseEnter, onFocus, ...restProps } = props;
  const { id, states, methods } = useSharedLayout();
  const ref = React.useRef<HTMLElement>(null);

  if (!id) {
    throw new Error(
      "SharedLayout.Item must be used within a SharedLayout.Root.",
    );
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    onMouseEnter?.(event);
    methods.setHovering?.(true);

    if (ref.current) methods.activate?.(ref.current);
  };

  // Focus bubbles in React, so any focusable element inside the item
  // brings the highlight to it for keyboard users too.
  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    onFocus?.(event);
    if (ref.current) methods.activate?.(ref.current);
  };

  return (
    <SharedLayoutItemWrapper
      as={states.as === "ul" ? "li" : "div"}
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      {...restProps}
    >
      <SharedLayoutContent>{children}</SharedLayoutContent>
    </SharedLayoutItemWrapper>
  );
};
SharedLayoutItem.displayName = "SharedLayout.Item";

SharedLayout.Root = SharedLayoutRoot;
SharedLayout.Item = SharedLayoutItem;

export { SharedLayout, SharedLayoutRoot, SharedLayoutItem };
