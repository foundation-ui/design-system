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

import { Overlay } from "../../src/overlay";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const onClickCallback = vi.fn();
const OverlayDefault = (args: {
  visible?: boolean;
  closeOnInteract?: boolean;
}) => {
  return (
    <Overlay
      visible={args.visible}
      closeOnInteract={Boolean(args.closeOnInteract)}
      onClick={onClickCallback}
      aria-label="test-overlay"
    >
      overlay
    </Overlay>
  );
};

expect.extend(toHaveNoViolations);
describe("Overlay", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<OverlayDefault visible />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", async () => {
    render(<OverlayDefault visible />);
    const OverlayComponent = screen.getByLabelText("test-overlay");

    expect(OverlayComponent.getAttribute("tabIndex")).toBe("-1");
    expect(OverlayComponent.getAttribute("aria-hidden")).toBe("true");
  });
  test("Does not render by default is visible is falsy", async () => {
    render(<OverlayDefault visible={false} />);
    expect(() => screen.getByLabelText("test-overlay")).toThrow();
  });
  test("Update the component state on click and fires the defined callback function", async () => {
    render(<OverlayDefault visible closeOnInteract />);
    const OverlayComponent = screen.getByLabelText("test-overlay");

    expect(OverlayComponent).toBeDefined();
    fireEvent.click(OverlayComponent);

    await waitFor(() => {
      expect(() => screen.getByLabelText("test-overlay")).toThrow();
      expect(onClickCallback).toHaveBeenCalled();
      expect(onClickCallback).toHaveBeenCalledTimes(1);
    });
  });
});
