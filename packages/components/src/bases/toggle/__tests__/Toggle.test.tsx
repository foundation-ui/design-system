import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Toggle } from "../";
import { SystemThemeProvider } from "@foundation/core";
import "@testing-library/jest-dom";

const onClickCallback = jest.fn();
const ToggleDefault = (args: { defaultChecked?: boolean }) => {
  return (
    <SystemThemeProvider>
      <Toggle defaultChecked={args.defaultChecked} onClick={onClickCallback}>
        Test
      </Toggle>
    </SystemThemeProvider>
  );
};

expect.extend(toHaveNoViolations);
describe("Toggle", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<ToggleDefault />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(<ToggleDefault />);
    const ToggleComponent = screen.getByRole("button");

    expect(ToggleComponent.getAttribute("type")).toBe("button");
    expect(ToggleComponent.getAttribute("value")).toBe("false");
    expect(ToggleComponent.getAttribute("data-checked")).toBe("false");
    expect(ToggleComponent.getAttribute("data-disabled")).toBe("false");
  });
  it("Update the component state on click and fires the defined callback function", async () => {
    render(<ToggleDefault />);
    const ToggleComponent = screen.getByRole("button");

    fireEvent.click(ToggleComponent);
    await waitFor(() => {
      expect(ToggleComponent.getAttribute("value")).toBe("true");
      expect(ToggleComponent.getAttribute("data-checked")).toBe("true");

      expect(onClickCallback).toHaveBeenCalled();
      expect(onClickCallback).toHaveBeenCalledTimes(1);
    });
  });
  it("Renders as checked if defaultChecked is defined", async () => {
    render(<ToggleDefault defaultChecked />);
    const ToggleComponent = screen.getByRole("button");

    expect(ToggleComponent.getAttribute("value")).toBe("true");
    expect(ToggleComponent.getAttribute("data-checked")).toBe("true");
  });
});
