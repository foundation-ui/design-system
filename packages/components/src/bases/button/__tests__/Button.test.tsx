import React from "react";
import { Button } from "../";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

const handleClick = jest.fn();
describe("Button", () => {
  it("Button renders as Default and ClickCallback fires as expected", async () => {
    render(
      <Button name="test" onClick={handleClick}>
        Test
      </Button>
    );

    const ButtonComponent = screen.getByRole("button");
    expect(ButtonComponent).not.toHaveAttribute("data-variant");

    expect(ButtonComponent).toHaveTextContent("Test");
    expect(ButtonComponent).toHaveAttribute("type", "button");
    expect(ButtonComponent).toHaveAttribute("tabIndex", "0");
    expect(ButtonComponent).toHaveAttribute("name", "test");
    expect(ButtonComponent).toHaveAttribute("aria-disabled", "false");
    expect(ButtonComponent).toHaveAttribute("aria-label", "test-action");
    expect(ButtonComponent).toHaveAttribute(
      "aria-description",
      "A button action named test-action. The action has a disabled state of: false"
    );

    act(() => {
      fireEvent.click(ButtonComponent);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
