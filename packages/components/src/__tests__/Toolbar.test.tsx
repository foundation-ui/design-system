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

import { Toolbar } from "../../src/toolbar";
import {
  ComponentSizeEnum,
  ComponentSideEnum,
  TComponentSize,
} from "../../../../types";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const onClickCallback = vi.fn();
const ToolbarDefault = (args: {
  showoncollapse?: boolean;
  defaultOpen?: boolean;
  shortcut?: boolean;
  side?: ComponentSideEnum;
  sizing?: ComponentSizeEnum;
  hotkey?: string;
}) => {
  return (
    <Toolbar.Root>
      <Toolbar
        side={args.side}
        sizing={args.sizing as TComponentSize}
        defaultOpen={args.defaultOpen}
        shortcut={args.shortcut}
        hotkey={args.hotkey}
      >
        <Toolbar.Section showoncollapse={args.showoncollapse}>
          <Toolbar.Item aria-label="test-item">item</Toolbar.Item>
          <Toolbar.Item aria-label="test-item-2">item2</Toolbar.Item>
        </Toolbar.Section>

        <Toolbar.Trigger onClick={onClickCallback}>&hArr;</Toolbar.Trigger>
      </Toolbar>
    </Toolbar.Root>
  );
};

expect.extend(toHaveNoViolations);
describe("Toolbar", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<ToolbarDefault />);
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", async () => {
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
  test("Update the component state on click and fires the defined callback function", async () => {
    render(<ToolbarDefault />);
    const Trigger = screen.getByRole("button");

    fireEvent.click(Trigger);
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(onClickCallback).toHaveBeenCalledTimes(1);
    });
  });
  test("Toggle the component when the trigger is clicked", async () => {
    render(<ToolbarDefault />);
    const Trigger = screen.getByRole("button");

    expect(() => screen.getByText("item")).toThrow();
    fireEvent.click(Trigger);
    await waitFor(() => {
      expect(screen.getByText("item")).toBeDefined();
    });
  });
  test("Toggle the component when the children item is clicked if showoncollapse is defined", async () => {
    render(<ToolbarDefault showoncollapse />);
    const Item = screen.getByLabelText("test-item");
    const Container = screen.getByRole("toolbar");

    fireEvent.click(Item);
    await waitFor(() => {
      expect(screen.getByLabelText("test-item")).toBeDefined();
      expect(Container.getAttribute("aria-expanded")).toBe("true");
    });
  });
  test("Renders the children sections even when it's closed if showoncollapse is defined", async () => {
    render(<ToolbarDefault showoncollapse />);
    const Item = screen.getByLabelText("test-item");
    const Container = screen.getByRole("toolbar");

    fireEvent.click(Item);
    await waitFor(() => {
      expect(screen.getByLabelText("test-item")).toBeDefined();
      expect(Container.getAttribute("aria-expanded")).toBe("true");
    });
  });
  test("Renders the component opened if defaultOpen is defined", async () => {
    render(<ToolbarDefault defaultOpen />);
    expect(screen.getByText("item")).toBeDefined();
  });
  test("Toggle the component when the keyboard shortcut is pressed", async () => {
    const { container } = render(
      <ToolbarDefault defaultOpen shortcut hotkey="a" />
    );
    expect(screen.getByText("item")).toBeDefined();

    fireEvent.keyDown(container, { key: "a", code: "KeyA", ctrlKey: true });
    await waitFor(() => expect(() => screen.getByText("item")).toThrow());
  });
});
