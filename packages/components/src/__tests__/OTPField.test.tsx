import React from "react";
import { expect, test, vi, beforeEach, afterEach, describe } from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import { OTPField } from "../";
import { axe, toHaveNoViolations } from "jest-axe";

beforeEach(async () => {
  vi.clearAllMocks();
});

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const Component = ({
  length,
  onComplete,
}: {
  length?: number;
  onComplete?: (value: string) => void;
}) => {
  return (
    <OTPField length={length} onComplete={onComplete}>
      <OTPField.Group aria-label="otp-field-group">
        {Array.from({ length: length ?? 6 }).map((_, index) => (
          <OTPField.Slot key={index} index={index} />
        ))}
      </OTPField.Group>
    </OTPField>
  );
};

expect.extend(toHaveNoViolations);
describe("One Tiime Password Field Component", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<Component />);

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Render OTP Field components", async () => {
    render(<Component length={1} />);

    expect(
      screen.getByTestId("otp-field-slot").getAttribute("autoComplete")
    ).toEqual("one-time-code");
  });
  test("Does not render OTP Field Slot if OTP Field context isn't set", async () => {
    render(
      <OTPField.Group aria-label="otp-field-group">
        <OTPField.Slot index={0} />
      </OTPField.Group>
    );

    expect(() => screen.getByTestId("otp-field-slot")).toThrow();
  });
  test("Render OTP Slots based on length", async () => {
    render(<Component length={10} />);

    expect(screen.getAllByTestId("otp-field-slot").length).toEqual(10);
  });
  test("Render OTP Field with 6 Slots if length is not defined", async () => {
    render(<Component />);

    expect(screen.getAllByTestId("otp-field-slot").length).toEqual(6);
  });
  test("Update slot value onChange", async () => {
    render(<Component length={1} />);

    const field = screen.getByTestId("otp-field-slot");
    fireEvent.change(field, { target: { value: "1" } });

    expect(field.getAttribute("value")).toEqual("1");
  });
  test("Fire onComplete when every slots are filled", async () => {
    const onComplete = vi.fn();
    render(<Component length={1} onComplete={onComplete} />);

    fireEvent.change(screen.getByTestId("otp-field-slot"), {
      target: { value: "1" },
    });
    expect(onComplete).toHaveBeenCalled();
  });
  test("Does not focus next slot when current slot is not filled", async () => {
    render(<Component length={2} />);

    fireEvent.focus(screen.getAllByTestId("otp-field-slot")[0]!);
    fireEvent.keyDown(screen.getAllByTestId("otp-field-slot")[0]!, {
      key: "Tab",
    });

    expect(
      screen.getAllByTestId("otp-field-slot")[1]!.getAttribute("data-active")
    ).toEqual("false");
  });
  test("Focus next slot when current slot is filled", async () => {
    render(<Component length={2} />);

    fireEvent.focus(screen.getAllByTestId("otp-field-slot")[0]!);
    fireEvent.change(screen.getAllByTestId("otp-field-slot")[0]!, {
      target: { value: "1" },
    });

    await waitFor(() => {
      expect(
        screen.getAllByTestId("otp-field-slot")[1]!.getAttribute("data-active")
      ).toEqual("true");
    });
  });
  test("Disable behavior when ArrowLeft || ArrowRight || Home || End key is pressed", async () => {
    render(<Component length={2} />);
    const slot1 = screen.getAllByTestId("otp-field-slot")[0]!;
    const slot2 = screen.getAllByTestId("otp-field-slot")[1]!;

    fireEvent.focus(slot1);
    fireEvent.keyDown(slot1, {
      key: "ArrowRight",
    });
    expect(slot2.getAttribute("data-active")).toEqual("false");
    fireEvent.keyDown(slot1, {
      key: "End",
    });
    expect(slot2.getAttribute("data-active")).toEqual("false");

    fireEvent.change(slot1, {
      target: { value: "1" },
    });
    fireEvent.keyDown(slot1, {
      key: "ArrowLeft",
    });
    expect(slot1.getAttribute("data-active")).toEqual("false");
    fireEvent.keyDown(slot1, {
      key: "Home",
    });
    expect(slot1.getAttribute("data-active")).toEqual("false");
  });
  test("Remove value from current slot and focus previous slot when Backspace || Delete key is pressed", async () => {
    render(<Component length={3} />);

    fireEvent.focus(screen.getAllByTestId("otp-field-slot")[0]!);
    fireEvent.change(screen.getAllByTestId("otp-field-slot")[0]!, {
      target: { value: "1" },
    });

    fireEvent.change(screen.getAllByTestId("otp-field-slot")[1]!, {
      target: { value: "2" },
    });
    fireEvent.keyDown(screen.getAllByTestId("otp-field-slot")[1]!, {
      key: "Backspace",
    });
    fireEvent.keyDown(screen.getAllByTestId("otp-field-slot")[1]!, {
      key: "Delete",
    });

    await waitFor(() => {
      expect(
        screen.getAllByTestId("otp-field-slot")[0]!.getAttribute("data-active")
      ).toEqual("true");
    });
  });
  test("Fill every Slots when a value is pasted", async () => {
    render(<Component length={2} />);

    fireEvent.focus(screen.getAllByTestId("otp-field-slot")[0]!);
    fireEvent.paste(screen.getAllByTestId("otp-field-slot")[0]!, {
      clipboardData: {
        getData: () => "123456",
      },
    });

    expect(
      screen.getAllByTestId("otp-field-slot")[0]!.getAttribute("value")
    ).toEqual("1");
    expect(
      screen.getAllByTestId("otp-field-slot")[1]!.getAttribute("value")
    ).toEqual("2");
  });
  test("Focus the next slot to fill on click", async () => {
    render(<Component length={3} />);
    const slot1 = screen.getAllByTestId("otp-field-slot")[0]!;
    const slot2 = screen.getAllByTestId("otp-field-slot")[1]!;
    const slot3 = screen.getAllByTestId("otp-field-slot")[2]!;

    fireEvent.change(slot1, { target: { value: "1" } });
    fireEvent.click(slot3);
    fireEvent.mouseDown(slot3);

    expect(slot2.getAttribute("data-active")).toEqual("true");
  });
});
