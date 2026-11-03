import type { HookRegistryMetadata } from "@chambellan/contracts";

export const UseFloatingPlacementMeta: HookRegistryMetadata = {
  kind: "hook",
  name: "useFloatingPlacement",
  title: "useFloatingPlacement",
  description:
    "Measures a trigger and a floating element and returns a fixed-position placement that keeps the floating element on screen. Horizontally it centers over the trigger when it fits, otherwise left-aligns, otherwise right-aligns; vertically it opens below the trigger when it fits, otherwise above. Returns null until both elements have been measured so the caller can keep the floating element hidden.",
  component: "FloatingPlacement",
  module: "@usefui/hooks",
  code: `import { useRef, useState } from "react";
import { useFloatingPlacement } from "@usefui/hooks";

export function HookComponent() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  const placement = useFloatingPlacement({
    enabled: open,
    getTriggerRect: () => triggerRef.current?.getBoundingClientRect(),
    floatingRef,
    gap: 8,
    margin: 12,
    deps: [open],
  });

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(!open)}>
        Toggle
      </button>

      {open && (
        <div
          ref={floatingRef}
          data-align={placement?.align}
          style={{
            position: "fixed",
            top: placement?.top ?? 0,
            left: placement?.left ?? 0,
            visibility: placement ? "visible" : "hidden",
          }}
        >
          Floating content
        </div>
      )}
    </>
  );
}`,
  arguments: [
    {
      name: "enabled",
      type: "boolean",
      required: true,
    },
    {
      name: "getTriggerRect",
      type: "() => TriggerRect | null | undefined",
      required: true,
    },
    {
      name: "floatingRef",
      type: "React.RefObject<HTMLElement | null>",
      required: true,
    },
    {
      name: "gap",
      type: "number",
      defaultValue: "4",
    },
    {
      name: "margin",
      type: "number",
      defaultValue: "4",
    },
    {
      name: "deps",
      type: "React.DependencyList",
      defaultValue: "[]",
    },
  ],
  returns: [
    {
      name: "placement",
      type: "FloatingPlacement | null",
      defaultValue: "null",
    },
  ],
  types: `type TriggerRect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

type FloatingPlacement = {
  /** Viewport x for the floating element. */
  left: number;
  /** Viewport y for the floating element. */
  top: number;
  /** Horizontal alignment chosen for the trigger. */
  align: ComponentSideEnum;
};

enum ComponentSideEnum {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
  Center = "center",
}

type UseFloatingPlacementOptions = {
  /** Whether the floating element is rendered. */
  enabled: boolean;
  /** Returns the current trigger rect (viewport coordinates). */
  getTriggerRect: () => TriggerRect | null | undefined;
  /** Ref of the floating element to position. */
  floatingRef: React.RefObject<HTMLElement | null>;
  /** Distance (px) between the trigger and the floating element. */
  gap?: number;
  /** Minimum distance (px) kept between the floating element and the viewport. */
  margin?: number;
  /** Extra dependencies that should trigger a re-computation. */
  deps?: React.DependencyList;
};`,
};
