import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { DropdownMenu } from "../";
import { SystemThemeProvider } from "@bsw/ds-core";

const onClickCallback = jest.fn();
const DropdownDefault = (args: { defaultOpen?: boolean }) => {
  return (
    <SystemThemeProvider>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger onClick={onClickCallback}>
          Trigger
        </DropdownMenu.Trigger>
        <DropdownMenu>
          <DropdownMenu.Content defaultOpen={args.defaultOpen}>
            <DropdownMenu.Item
              aria-label="toggle-item"
              onClick={onClickCallback}
            >
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
    </SystemThemeProvider>
  );
};

expect.extend(toHaveNoViolations);
describe("Dropdown", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<DropdownDefault defaultOpen />);
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(<DropdownDefault />);
    const Trigger = screen.getByRole("button");

    expect(Trigger.getAttribute("data-state")).toBe("closed");
    expect(Trigger.getAttribute("aria-haspopup")).toBe("menu");
    expect(Trigger.getAttribute("id")).toBeDefined();

    fireEvent.click(Trigger);
    await waitFor(() => {
      const Content = screen.getByRole("menu");

      expect(Content.getAttribute("data-state")).toBe("open");
      expect(Content.getAttribute("aria-orientation")).toBe("vertical");
      expect(Content.getAttribute("data-side")).toBeDefined();
      expect(Content.getAttribute("data-align")).toBeDefined();
      expect(Content.getAttribute("aria-labelledby")).toBeDefined();
    });
  });
  it("Fires the defined callback function and toggle the content when the trigger is clicked", async () => {
    render(<DropdownDefault />);

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(screen.getByRole("menu")).toBeDefined();
    });
  });
  it("Fires the defined callback function and toggle the content when the item is clicked", async () => {
    render(<DropdownDefault />);

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(screen.getByRole("menu")).toBeDefined();
      expect(screen.getAllByRole("menuitem").length).toBe(2);
    });

    fireEvent.click(screen.getByLabelText("toggle-item"));
    await waitFor(() => {
      expect(() => screen.getByRole("menu")).toThrow();
    });
  });
  it("Fires the defined callback function without toggling the content when the item is clicked", async () => {
    render(<DropdownDefault defaultOpen />);

    await waitFor(() => expect(screen.getByRole("menu")).toBeDefined());

    fireEvent.click(screen.getByLabelText("static-item"));
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();
      expect(screen.getByRole("menu")).toBeDefined();
    });
  });
  it("Fires the defined callback function if an inner item is focused and a keypress is detected", async () => {
    render(<DropdownDefault defaultOpen />);
    await waitFor(() => expect(screen.getByRole("menu")).toBeDefined());

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
    await waitFor(() => expect(screen.getByRole("menu")).toBeDefined());
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
  it("Renders the component by default if open is defined", async () => {
    render(<DropdownDefault defaultOpen />);
    await waitFor(() => expect(screen.getByRole("menu")).toBeDefined());
  });
  it("Close the component on click outside", async () => {
    render(<DropdownDefault defaultOpen />);
    await waitFor(() => expect(screen.getByRole("menu")).toBeDefined());

    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(() => screen.getByLabelText("toggle-item")).toThrow();
    });
  });
});
