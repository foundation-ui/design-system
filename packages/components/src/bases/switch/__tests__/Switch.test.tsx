import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Switch } from "../";
import { SystemThemeProvider } from "@bsw/ds-core";

const onClickCallback = jest.fn();
const Switchefault = (args: { defaultChecked?: boolean }) => {
  return (
    <SystemThemeProvider>
      <Switch.Root>
        <label id="label" htmlFor="switch-demo">
          test switch
        </label>
        <Switch
          id="switch-demo"
          defaultChecked={args.defaultChecked}
          onClick={onClickCallback}
          aria-labelledby="label"
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
  });
  it("Update the component state on click and fires the defined callback function", async () => {
    render(<Switchefault />);
  });
});
