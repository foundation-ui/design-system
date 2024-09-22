import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Checkbox } from "..";

const onClickCallback = jest.fn();
const onChangeCallback = jest.fn();
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
  it("Renders without accessibility violation", async () => {
    const { container } = render(<CheckboxDefault />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", () => {
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
  it("Toggle checked state on click and fire callback function", async () => {
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
  it("Renders as checked if defaultChecked is defined", async () => {
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
