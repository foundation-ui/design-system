"use client";

import React from "react";

import { ContextMenuProvider, useContextMenu } from "./hooks";

import { SharedLayout } from "../shared-layout";
import {
  ContextMenuContentWrapper,
  ContextMenuPortal,
  ItemWrapper,
} from "./styles";

import { clamp, getCollapsedClip } from "../utils";

import type {
  IContextMenuAreaProperties,
  IContextMenuContentProperties,
  IContextMenuMenuProperties,
  IContextMenuPoint,
  IContextMenuItem,
} from "./types";

export interface IContextMenuComposition {
  Root: typeof ContextMenuRoot;
  Area: typeof ContextMenuArea;
  Content: typeof ContextMenuContent;
  Item: typeof ContextMenuItem;
}

/** Ignore outside presses this soon after opening (touch long-press). */
const OPEN_GUARD_MS = 100;

/**
 * ContextMenu.Root provides the context shared by the ContextMenu compounds.
 * It does not render a DOM element and only accepts children.
 *
 * @param {ReactNode} props.children - ContextMenu compounds.
 * @returns {ReactElement} The ContextMenu provider.
 */
const ContextMenuRoot = ({ children }: { children: React.ReactNode }) => {
  return <ContextMenuProvider>{children}</ContextMenuProvider>;
};
ContextMenuRoot.displayName = "ContextMenu.Root";

/**
 * ContextMenu.Menu owns the open/close behavior: the controlled or
 * uncontrolled open state, `onOpenChange`, and dismissal on outside press,
 * scroll and resize. It does not render a DOM element.
 *
 * @param {IContextMenuMenuProperties} props - The props for ContextMenu.Menu.
 * @param {boolean} props.open - Controlled open state.
 * @param {boolean} props.defaultOpen - Initial open state when uncontrolled. Defaults to false.
 * @param {(open: boolean) => void} props.onOpenChange - Called whenever the open state changes.
 * @param {ReactNode} props.children - ContextMenu compounds.
 * @returns {ReactElement} The ContextMenu.Menu component.
 */
const ContextMenu = (props: IContextMenuMenuProperties) => {
  const { children, open, defaultOpen = false, onOpenChange } = props;
  const { states, methods, refs } = useContextMenu();

  const initialOpen = React.useRef(defaultOpen);
  const controlled = open !== undefined;

  // Registered on every render so `onOpenChange` is never stale.
  React.useLayoutEffect(() => {
    methods.configure({ controlled, onOpenChange });
  });

  // Runs on mount, and again only when the controlled value changes
  // (`methods` is stable).
  React.useLayoutEffect(() => {
    methods.sync(open ?? initialOpen.current);
  }, [open, methods]);

  React.useEffect(() => {
    if (!states.open) return;

    const openedAt = performance.now();

    const onPointerDown = (event: PointerEvent) => {
      if (performance.now() - openedAt < OPEN_GUARD_MS) return;
      if (!refs.content.current?.contains(event.target as Node)) {
        methods.setOpen(false);
      }
    };
    const onResize = () => methods.setOpen(false);
    const onScroll = (event: Event) => {
      // Ignore scrolling inside the menu itself.
      const target = event.target as Node | null;
      if (target && refs.content.current?.contains(target)) return;
      methods.setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    // Capture so scrolls of any ancestor container are caught too.
    window.addEventListener("scroll", onScroll, { capture: true });
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [states.open, methods, refs.content]);

  return <React.Fragment>{children}</React.Fragment>;
};
ContextMenu.displayName = "ContextMenu";

/**
 * ContextMenu.Area is the region that opens the menu. It opens on right-click,
 * on a touch or pen long press, and on the `ContextMenu` key or `Shift+F10`.
 *
 * **Best practices:**
 *
 * - Keep it focusable (it defaults to `tabIndex={0}`) so keyboard users can
 *   open the menu.
 *
 * @param {IContextMenuAreaProperties} props - The props for ContextMenu.Area.
 * @param {ReactNode} props.children - The area content.
 * @returns {ReactElement} The ContextMenu.Area component.
 */
const ContextMenuArea = (props: IContextMenuAreaProperties) => {
  const { children, style, onContextMenu, ...restProps } = props;
  const { id, states, methods, refs } = useContextMenu();

  return (
    <div
      tabIndex={0}
      {...restProps}
      ref={refs.area as React.RefObject<HTMLDivElement | null>}
      aria-controls={states.open ? id : undefined}
      aria-haspopup="menu"
      aria-expanded={states.open}
      onContextMenu={(event: React.MouseEvent<HTMLDivElement>) => {
        onContextMenu?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        methods.openAt({ x: event.clientX, y: event.clientY });
      }}
      // Suppresses the iOS long-press callout only.
      style={{ WebkitTouchCallout: "none", ...style }}
    >
      {children}
    </div>
  );
};
ContextMenuArea.displayName = "ContextMenu.Area";

/**
 * ContextMenu.Content renders the menu at the invocation point, clamped to the
 * viewport, and morphs it open from that point. `Escape` closes it and returns
 * focus to ContextMenu.Area; `Tab` closes it.
 *
 * **Best practices:**
 *
 * - Provide an `aria-label` that describes the menu. Defaults to "Context menu".
 * - Keep it mounted so the close transition can play.
 *
 * @param {IContextMenuContentProperties} props - The props for ContextMenu.Content.
 * @param {ReactNode} props.children - The menu content.
 * @returns {ReactElement | null} The ContextMenu.Content component.
 */
const ContextMenuContent = (props: IContextMenuContentProperties) => {
  const {
    sizing = "medium",
    shape = "smooth",
    style,
    onKeyDown,
    onContextMenu,
    children,
    ...restProps
  } = props;
  const { id, states, methods, refs } = useContextMenu();

  const [mounted, setMounted] = React.useState(false);
  const [position, setPosition] = React.useState<IContextMenuPoint>(
    states.point,
  );
  const [origin, setOrigin] = React.useState<IContextMenuPoint>({ x: 0, y: 0 });
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const [morphReady, setMorphReady] = React.useState(false);

  const visible = states.open && morphReady;
  const clip = visible
    ? "inset(0 0 0 0 round 0)"
    : getCollapsedClip(origin, size);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape") {
      event.preventDefault();
      methods.setOpen(false);
      refs.area.current?.focus();
    } else if (event.key === "Tab") {
      methods.setOpen(false);
    }
  };

  React.useEffect(() => setMounted(true), []);

  React.useLayoutEffect(() => {
    if (!states.open) {
      setMorphReady(false);
      return;
    }

    const content = refs.content.current;
    if (!content) return;

    const rect = content.getBoundingClientRect();
    const left = Math.max(
      0,
      Math.min(Math.max(states.point.x, 0), window.innerWidth - rect.width),
    );
    const top = Math.max(
      0,
      Math.min(Math.max(states.point.y, 0), window.innerHeight - rect.height),
    );

    setPosition({ x: left, y: top });
    setSize({ width: rect.width, height: rect.height });
    setOrigin({
      x: clamp(states.point.x - left, 12, Math.max(12, rect.width - 12)),
      y: clamp(states.point.y - top, 12, Math.max(12, rect.height - 12)),
    });
    setMorphReady(false);

    // Let the measured collapsed clip paint once before expanding it, otherwise
    // both states can batch and the menu appears at full size with no morph.
    let openFrame = 0;
    const prepareFrame = requestAnimationFrame(() => {
      openFrame = requestAnimationFrame(() => setMorphReady(true));
    });
    return () => {
      cancelAnimationFrame(prepareFrame);
      cancelAnimationFrame(openFrame);
    };
  }, [states.open, states.point, states.invocation, refs.content]);

  // Focus the menu itself so `Escape` and `Tab` reach it.
  React.useEffect(() => {
    if (!states.open) return;
    const frame = requestAnimationFrame(() => {
      refs.content.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [states.open, refs.content]);

  if (!mounted) return null;

  return (
    <ContextMenuPortal
      data-open={states.open}
      aria-hidden={!states.open}
      inert={!states.open}
      style={
        {
          "--menu-x": `${position.x}px`,
          "--menu-y": `${position.y}px`,
        } as React.CSSProperties
      }
    >
      <ContextMenuContentWrapper
        ref={refs.content}
        id={id}
        role="menu"
        tabIndex={-1}
        aria-label="Context menu"
        data-size={sizing}
        data-shape={shape}
        data-state={states.open ? "open" : "closed"}
        data-visible={visible}
        data-morph-ready={morphReady}
        {...restProps}
        onKeyDown={handleKeyDown}
        onContextMenu={(event: React.MouseEvent<HTMLDivElement>) => {
          onContextMenu?.(event);
          event.preventDefault();
        }}
        style={{ "--menu-clip": clip, ...style } as React.CSSProperties}
      >
        <SharedLayout.Root>
          <SharedLayout inset={12}>{children}</SharedLayout>
        </SharedLayout.Root>
      </ContextMenuContentWrapper>
    </ContextMenuPortal>
  );
};
ContextMenuContent.displayName = "ContextMenu.Content";

/**
 * ContextMenuItem component.
 *
 * Activates on click, `Enter` or `Space`. Closes the menu afterwards unless
 * `radio` is set.
 *
 * @returns {ReactElement} The ContextMenuItem component.
 */
const ContextMenuItem = (props: IContextMenuItem) => {
  const { onClick, radio = false, disabled, children, ...restProps } = props;
  const { states, methods } = useContextMenu();
  const { setOpen } = methods;

  const activate = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    if (disabled) return;
    onClick?.(event);
    if (!radio) setOpen(!states.open);
  };

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    activate(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      // Prevent page scroll on Space.
      event.preventDefault();
      activate(event);
    }
  };

  return (
    <SharedLayout.Item>
      <ItemWrapper
        role="menuitem"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        data-orientation="vertical"
        {...restProps}
      >
        {children}
      </ItemWrapper>
    </SharedLayout.Item>
  );
};
ContextMenuItem.displayName = "ContextMenu.Item";

ContextMenu.Root = ContextMenuRoot;
ContextMenu.Area = ContextMenuArea;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;

export {
  ContextMenu,
  ContextMenuRoot,
  ContextMenuArea,
  ContextMenuContent,
  ContextMenuItem,
};
