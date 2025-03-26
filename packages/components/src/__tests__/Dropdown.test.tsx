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

import { DropdownMenu } from "../../src/dropdown";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const onClickCallback = vi.fn();
const DropdownDefault = (args: { defaultOpen?: boolean }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger onClick={onClickCallback}>
        Trigger
      </DropdownMenu.Trigger>
      <DropdownMenu>
        <DropdownMenu.Content
          defaultOpen={args.defaultOpen}
          aria-label="test-menu"
        >
          <DropdownMenu.Item aria-label="toggle-item" onClick={onClickCallback}>
            Toggle Item
          </DropdownMenu.Item>
          <DropdownMenu.Item
            radio
            aria-label="static-item"
            onClick={onClickCallback}
          >
            Static Item
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </DropdownMenu.Root>
  );
};

expect.extend(toHaveNoViolations);
describe("Dropdown", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<DropdownDefault defaultOpen />);
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", async () => {
    render(<DropdownDefault />);
    const Trigger = screen.getByRole("button");

    expect(Trigger.getAttribute("data-state")).toBe("closed");
    expect(Trigger.getAttribute("aria-haspopup")).toBe("menu");
    expect(Trigger.getAttribute("id")).toBeDefined();

    fireEvent.click(Trigger);
    await waitFor(() => {
      const Content = screen.getByLabelText("test-menu");

      expect(Content.getAttribute("data-state")).toBe("open");
      expect(Content.getAttribute("data-side")).toBeDefined();
      expect(Content.getAttribute("data-align")).toBeDefined();
      expect(Content.getAttribute("aria-labelledby")).toBeDefined();
    });
  });
  test("Fires the defined callback function and toggle the content when the trigger is clicked", async () => {
    render(<DropdownDefault />);

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(screen.getByLabelText("test-menu")).toBeDefined();
    });
  });
  test("Fires the defined callback function and toggle the content when the item is clicked", async () => {
    render(<DropdownDefault />);

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(screen.getByLabelText("test-menu")).toBeDefined();
      expect(screen.getByLabelText("toggle-item")).toBeDefined();
      expect(screen.getByLabelText("static-item")).toBeDefined();
    });

    fireEvent.click(screen.getByLabelText("toggle-item"));
    await waitFor(() => {
      expect(() => screen.getByLabelText("test-menu")).toThrow();
    });
  });
  test("Fires the defined callback function without toggling the content when the item is clicked", async () => {
    render(<DropdownDefault defaultOpen />);

    await waitFor(() =>
      expect(screen.getByLabelText("test-menu")).toBeDefined()
    );

    fireEvent.click(screen.getByLabelText("static-item"));
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(screen.getByLabelText("test-menu")).toBeDefined();
    });
  });
  test("Fires the defined callback function if an inner item is focused and a keypress is detected", async () => {
    render(<DropdownDefault defaultOpen />);
    await waitFor(() =>
      expect(screen.getByLabelText("test-menu")).toBeDefined()
    );

    screen.getByLabelText("toggle-item").focus();
    fireEvent.keyDown(screen.getByLabelText("toggle-item"), {
      key: "Enter",
      code: "Enter",
    });
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(() => screen.getByLabelText("toggle-item")).toThrow();
    });

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.getByLabelText("test-menu")).toBeDefined()
    );
    screen.getByLabelText("toggle-item").focus();
    fireEvent.keyDown(screen.getByLabelText("static-item"), {
      key: "Space",
      code: "Space",
    });
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(screen.getByLabelText("static-item")).toBeDefined();
    });
  });
  test("Renders the component by default if open is defined", async () => {
    render(<DropdownDefault defaultOpen />);
    await waitFor(() =>
      expect(screen.getByLabelText("test-menu")).toBeDefined()
    );
  });
  test("Close the component on click outside", async () => {
    render(<DropdownDefault defaultOpen />);
    await waitFor(() =>
      expect(screen.getByLabelText("test-menu")).toBeDefined()
    );

    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(() => screen.getByLabelText("toggle-item")).toThrow();
    });
  });
});
