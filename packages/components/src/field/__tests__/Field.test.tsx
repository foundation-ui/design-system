import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Field } from "..";

const onClickCallback = jest.fn();
const onChangeCallback = jest.fn();
const FieldDefault = (args: { error?: string; hint?: string }) => {
  return (
    <Field.Root>
      <Field.Wrapper>
        <Field.Label>Test Input</Field.Label>
        <Field
          name="test"
          value="test"
          placeholder="test-placeholder"
          onChange={onChangeCallback}
          onClick={onClickCallback}
          {...args}
        />
      </Field.Wrapper>
    </Field.Root>
  );
};

expect.extend(toHaveNoViolations);
describe("Field", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<FieldDefault />);
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(<FieldDefault />);
    const FieldComponent = screen.getByPlaceholderText("test-placeholder");

    expect(FieldComponent.getAttribute("aria-invalid")).toBe("false");
    expect(FieldComponent.getAttribute("aria-describedby")).toBeDefined();
    expect(FieldComponent.getAttribute("aria-errormessage")).toBe(null);
    expect(FieldComponent.getAttribute("data-error")).toBe("false");
  });
  it("Update the content on change and fires the defined callback function", async () => {
    render(<FieldDefault />);
    const FieldComponent = screen.getByPlaceholderText("test-placeholder");

    fireEvent.click(FieldComponent);
    fireEvent.change(FieldComponent, { target: { value: "updated" } });
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(onChangeCallback).toHaveBeenCalled();
    });
  });
  it("Renders a meta component on error", async () => {
    render(<FieldDefault error="error-message" />);
    const FieldComponent = screen.getByPlaceholderText("test-placeholder");

    await waitFor(() => {
      expect(screen.getByText("error-message")).toBeDefined();
      expect(FieldComponent.getAttribute("aria-invalid")).toBe("true");
      expect(FieldComponent.getAttribute("aria-errormessage")).toBe(
        "error-message"
      );
      expect(FieldComponent.getAttribute("data-error")).toBe("true");
    });
  });
  it("Renders a meta component as hint", async () => {
    render(<FieldDefault hint="hint-message" />);
    const FieldComponent = screen.getByPlaceholderText("test-placeholder");

    await waitFor(() => {
      expect(screen.getByText("hint-message")).toBeDefined();
      expect(FieldComponent.getAttribute("aria-invalid")).toBe("false");
      expect(FieldComponent.getAttribute("aria-errormessage")).toBe(null);
      expect(FieldComponent.getAttribute("data-error")).toBe("false");
    });
  });
  it("Hides the hint component to display the error when they're both defined at the same time", async () => {
    render(<FieldDefault error="error-message" hint="hint-message" />);

    await waitFor(() => {
      expect(screen.getByText("error-message")).toBeDefined();
      expect(() => screen.getByText("hint-message")).toThrow();
    });
  });
});
