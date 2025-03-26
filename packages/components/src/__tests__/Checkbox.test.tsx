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

import { Checkbox } from "../../src/checkbox";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const onClickCallback = vi.fn();
const onChangeCallback = vi.fn();
const CheckboxDefault = () => {
  return (
    <Checkbox.Root>
      <Checkbox
        checked={false}
        onClick={onClickCallback}
        onChange={onChangeCallback}
        name="test"
      >
        <Checkbox.Indicator />
      </Checkbox>
    </Checkbox.Root>
  );
};

expect.extend(toHaveNoViolations);
describe("Checkbox", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<CheckboxDefault />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", () => {
    render(<CheckboxDefault />);
    const CheckboxComponent = screen.getByLabelText("test-native-checkbox");

    expect(CheckboxComponent.getAttribute("type")).toBe("checkbox");
    expect(CheckboxComponent.getAttribute("tabindex")).toBe("0");
    expect(CheckboxComponent.getAttribute("value")).toBe("unchecked");
    expect(CheckboxComponent.getAttribute("aria-checked")).toBe("false");
    expect(CheckboxComponent.getAttribute("aria-disabled")).toBe("false");
    expect(CheckboxComponent.getAttribute("aria-required")).toBe("false");
    expect(CheckboxComponent.getAttribute("data-state")).toBe("unchecked");
  });
  test("Toggle checked state on click and fire callback function", async () => {
    render(<CheckboxDefault />);
    const CheckboxComponent = screen.getByLabelText("test-checkbox");
    const CheckboxNative = screen.getByLabelText("test-native-checkbox");

    expect(CheckboxComponent.getAttribute("data-state")).toBe("unchecked");

    expect(CheckboxNative.getAttribute("value")).toBe("unchecked");
    expect(CheckboxNative.getAttribute("aria-checked")).toBe("false");

    fireEvent.click(CheckboxNative);
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(screen.getByTitle("Checked")).toBeDefined();

      expect(CheckboxComponent.getAttribute("data-state")).toBe("checked");
      expect(CheckboxNative.getAttribute("value")).toBe("checked");
      expect(CheckboxNative.getAttribute("aria-checked")).toBe("true");
    });

    fireEvent.click(CheckboxNative);
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(CheckboxComponent.getAttribute("data-state")).toBe("unchecked");
      expect(CheckboxNative.getAttribute("value")).toBe("unchecked");
      expect(CheckboxNative.getAttribute("aria-checked")).toBe("false");
    });
  });
  test("Renders as checked if defaultChecked is defined", async () => {
    render(
      <Checkbox.Root>
        <Checkbox
          name="test"
          defaultChecked
          onClick={onClickCallback}
          onChange={onChangeCallback}
        >
          <Checkbox.Indicator />
        </Checkbox>
      </Checkbox.Root>
    );
    const CheckboxComponent = screen.getByLabelText("test-checkbox");
    const CheckboxNative = screen.getByLabelText("test-native-checkbox");

    expect(CheckboxComponent.getAttribute("data-state")).toBe("checked");
    expect(CheckboxNative.getAttribute("value")).toBe("checked");
    expect(CheckboxNative.getAttribute("aria-checked")).toBe("true");
  });
});
