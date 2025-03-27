import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import {
  screen,
  render,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Sheet } from "../../src";
import {
  ComponentSideEnum,
  ComponentSizeEnum,
  TComponentSize,
} from "../../../../types";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const onClickCallback = vi.fn();
const onClickCallbackInner = vi.fn();

const SheetDefault = (args: {
  open?: boolean;
  closeOnInteract?: boolean;
  shortcut?: boolean;
  side?: ComponentSideEnum;
  sizing?: ComponentSizeEnum;
  hotkey?: string;
}) => {
  return (
    <Sheet.Root>
      <Sheet.Trigger name="external" onClick={onClickCallback}>
        Ext Trigger
      </Sheet.Trigger>

      <Sheet
        open={args.open}
        side={args.side as any}
        sizing={args.sizing as TComponentSize}
        shortcut={args.shortcut}
        hotkey={args.hotkey}
        aria-label="test-sheet"
      >
        <h4>test-content</h4>
        <Sheet.Trigger name="inner" onClick={onClickCallbackInner}>
          Inner Trigger
        </Sheet.Trigger>
      </Sheet>
    </Sheet.Root>
  );
};

expect.extend(toHaveNoViolations);
describe("Sheet", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<SheetDefault open />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", async () => {
    render(<SheetDefault />);
    const ExtTrigger = screen.getByLabelText("external-action");

    expect(ExtTrigger.getAttribute("data-state")).toBe("closed");

    fireEvent.click(ExtTrigger);
    await waitFor(() => {
      const Content = screen.getByLabelText("test-sheet");
      const InnerTrigger = screen.getByLabelText("inner-action");

      expect(ExtTrigger.getAttribute("data-state")).toBe("open");
      expect(InnerTrigger.getAttribute("data-state")).toBe("open");

      expect(Content.getAttribute("role")).toBe("dialog");
      expect(Content.getAttribute("data-state")).toBe("open");
      expect(Content.getAttribute("tabIndex")).toBe("-1");
      expect(Content.getAttribute("aria-labelledby")).toBeDefined();
    });
  });
  test("Fires the defined callback functions and toggle the content when the triggers are clicked", async () => {
    render(<SheetDefault />);

    fireEvent.click(screen.getByLabelText("external-action"));
    await waitFor(() => expect(onClickCallback).toHaveBeenCalled());

    fireEvent.click(screen.getByLabelText("inner-action"));
    await waitFor(() => expect(onClickCallbackInner).toHaveBeenCalled());
  });
  test("Renders the component by default if open is defined", async () => {
    render(<SheetDefault open />);
    await waitFor(() =>
      expect(screen.getByLabelText("test-sheet")).toBeDefined()
    );
  });
  test("Removes the component from the DOM if the Overlay is clicked and closeOnInteract is defined", async () => {
    render(<SheetDefault open closeOnInteract />);
    await waitFor(() => {
      const Overlay = screen.getByLabelText("test-sheet-overlay");

      expect(Overlay).toBeDefined();
      expect(Overlay.getAttribute("aria-hidden")).toBe("true");
    });

    fireEvent.click(screen.getByLabelText("test-sheet-overlay"));
    expect(() => screen.getByRole("region")).toThrow();
    expect(() => screen.getByLabelText("test-sheet-overlay")).toThrow();
  });
  test("Toggle the component when the keyboard shortcut is pressed", async () => {
    const { container } = render(<SheetDefault open shortcut hotkey="a" />);
    expect(screen.getByText("test-content")).toBeDefined();

    fireEvent.keyDown(container, { key: "a", code: "KeyA", ctrlKey: true });
    await waitFor(() =>
      expect(() => screen.getByText("test-content")).toThrow()
    );
  });
});
