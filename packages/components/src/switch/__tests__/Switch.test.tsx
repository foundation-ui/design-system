import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Switch } from "..";
import { SystemThemeProvider } from "@foundation-ui/tokens";

const onClickCallback = jest.fn();
const Switchefault = (args: { defaultChecked?: boolean }) => {
  return (
    <SystemThemeProvider>
      <Switch.Root>
        <label id="label" htmlFor="switch-test">
          test switch
        </label>
        <Switch
          defaultChecked={args.defaultChecked}
          onClick={onClickCallback}
          aria-labelledby="label"
          disabled={false}
        >
          <Switch.Thumb />
        </Switch>
      </Switch.Root>
    </SystemThemeProvider>
  );
};

expect.extend(toHaveNoViolations);
describe("Switch", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<Switchefault />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(<Switchefault />);
    const Trigger = screen.getByTitle("switch-trigger");
    const Thumb = screen.getByTitle("switch-thumb");

    expect(Trigger.getAttribute("value")).toBe("false");
    expect(Trigger.getAttribute("type")).toBe("button");
    expect(Trigger.getAttribute("aria-checked")).toBe("false");
    expect(Trigger.getAttribute("data-disabled")).toBe("false");

    expect(Thumb.getAttribute("aria-hidden")).toBeDefined();
    expect(Thumb.getAttribute("tabIndex")).toBe("-1");
    expect(Thumb.getAttribute("role")).toBe("presentation");
    expect(Thumb.getAttribute("data-checked")).toBe("false");
  });
  it("Update the component state on click and fires the defined callback function", async () => {
    render(<Switchefault />);
    const Trigger = screen.getByTitle("switch-trigger");
    const Thumb = screen.getByTitle("switch-thumb");

    fireEvent.click(Trigger);

    await waitFor(() => {
      expect(Trigger.getAttribute("value")).toBe("true");
      expect(Trigger.getAttribute("aria-checked")).toBe("true");
      expect(Thumb.getAttribute("data-checked")).toBe("true");
      expect(Thumb.getAttribute("data-checked")).toBe("true");

      expect(onClickCallback).toHaveBeenCalled();
      expect(onClickCallback).toHaveBeenCalledTimes(1);
    });
  });
  it("Renders as checked if defaultChecked is defined", async () => {
    render(<Switchefault defaultChecked />);
    const Trigger = screen.getByTitle("switch-trigger");
    const Thumb = screen.getByTitle("switch-thumb");

    expect(Trigger.getAttribute("value")).toBe("true");
    expect(Trigger.getAttribute("aria-checked")).toBe("true");
    expect(Thumb.getAttribute("data-checked")).toBe("true");
    expect(Thumb.getAttribute("data-checked")).toBe("true");
  });
});
