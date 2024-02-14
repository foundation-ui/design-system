import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Toolbar } from "../";
import { SystemThemeProvider } from "@bsw/ds-core";
import { ComponentSizeEnum, ComponentSideEnum } from "../../../../../../types";

import "@testing-library/jest-dom";

const onClickCallback = jest.fn();
const ToolbarDefault = (args: {
  showOnCollapse?: boolean;
  defaultOpen?: boolean;
  fixed?: boolean;
  shortcut?: boolean;
  side?: ComponentSideEnum;
  sizing?: ComponentSizeEnum;
}) => {
  return (
    <SystemThemeProvider>
      <Toolbar.Root>
        <Toolbar
          side={args.side}
          sizing={args.sizing}
          defaultOpen={args.defaultOpen}
          shortcut={args.shortcut}
          fixed={args.fixed}
        >
          <Toolbar.Section showOnCollapse={args.showOnCollapse}>
            <Toolbar.Item>item</Toolbar.Item>
          </Toolbar.Section>

          {!args.fixed && (
            <Toolbar.Trigger onClick={onClickCallback}>&hArr;</Toolbar.Trigger>
          )}
        </Toolbar>
      </Toolbar.Root>
    </SystemThemeProvider>
  );
};

expect.extend(toHaveNoViolations);
describe("Toolbar", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<ToolbarDefault />);
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(<ToolbarDefault />);
    const Container = screen.getByRole("toolbar");
    const Trigger = screen.getByRole("button");

    expect(() => screen.getByText("item")).toThrow();

    expect(Container).toBeDefined();
    expect(Container.getAttribute("aria-label")).toBeDefined();
    expect(Container.getAttribute("aria-controls")).toBeDefined();
    expect(Container.getAttribute("aria-expanded")).toBe("false");
    expect(Container.getAttribute("aria-orientation")).toBe("vertical");
    expect(Container.getAttribute("data-side")).toBe("left");

    expect(Trigger).toBeDefined();
    expect(Trigger.getAttribute("id")).toBe(
      Container.getAttribute("aria-controls")
    );

    fireEvent.click(Trigger);
    await waitFor(() => {
      const Item = screen.getByText("item");

      expect(Item).toBeDefined();
      expect(Item.getAttribute("tabIndex")).toBe("-1");
      expect(Item.getAttribute("aria-hidden")).toBe("true");
      expect(Item.getAttribute("data-expanded")).toBe("true");
      expect(Item.getAttribute("aria-describedby")).toBeDefined();
    });
  });
  it("Update the component state on click and fires the defined callback function", async () => {
    render(<ToolbarDefault />);
    const Trigger = screen.getByRole("button");

    fireEvent.click(Trigger);
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
    });
  });
});
