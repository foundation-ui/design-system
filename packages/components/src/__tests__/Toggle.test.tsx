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

import { Toggle } from "../../src/toggle";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const onClickCallback = vi.fn();
const ToggleDefault = (args: { defaultChecked?: boolean }) => {
  return (
    <Toggle defaultChecked={args.defaultChecked} onClick={onClickCallback}>
      Test
    </Toggle>
  );
};

expect.extend(toHaveNoViolations);
describe("Toggle", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<ToggleDefault />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", async () => {
    render(<ToggleDefault />);
    const ToggleComponent = screen.getByRole("switch");

    expect(ToggleComponent.getAttribute("type")).toBe("button");
    expect(ToggleComponent.getAttribute("value")).toBe("false");
    expect(ToggleComponent.getAttribute("data-checked")).toBe("false");
    expect(ToggleComponent.getAttribute("data-disabled")).toBe("false");
  });
  test("Update the component state on click and fires the defined callback function", async () => {
    render(<ToggleDefault />);
    const ToggleComponent = screen.getByRole("switch");

    fireEvent.click(ToggleComponent);
    await waitFor(() => {
      expect(ToggleComponent.getAttribute("value")).toBe("true");
      expect(ToggleComponent.getAttribute("data-checked")).toBe("true");

      expect(onClickCallback).toHaveBeenCalled();
      expect(onClickCallback).toHaveBeenCalledTimes(1);
    });
  });
  test("Renders as checked if defaultChecked is defined", async () => {
    render(<ToggleDefault defaultChecked />);
    const ToggleComponent = screen.getByRole("switch");

    expect(ToggleComponent.getAttribute("value")).toBe("true");
    expect(ToggleComponent.getAttribute("data-checked")).toBe("true");
  });
});
