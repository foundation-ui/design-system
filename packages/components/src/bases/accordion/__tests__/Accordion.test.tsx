import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Accordion } from "../";
import { SystemThemeProvider } from "@bsw/ds-core";

expect.extend(toHaveNoViolations);
describe("Accordion", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(
      <SystemThemeProvider>
        <SystemThemeProvider>
          <Accordion.Root>
            <Accordion>
              <Accordion.Trigger value="1">1</Accordion.Trigger>
              <Accordion.Content value="1" defaultOpen>
                2
              </Accordion.Content>
            </Accordion>
          </Accordion.Root>
        </SystemThemeProvider>
      </SystemThemeProvider>
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(
      <SystemThemeProvider>
        <Accordion.Root>
          <Accordion>
            <Accordion.Trigger value="1">1</Accordion.Trigger>
            <Accordion.Content value="1">1</Accordion.Content>
          </Accordion>
        </Accordion.Root>
      </SystemThemeProvider>
    );
    const Trigger = screen.getByLabelText("button-action");

    expect(Trigger).toBeDefined();
    expect(() => screen.getByRole("region")).toThrow();

    fireEvent.click(Trigger);
    await waitFor(() => {
      const Content = screen.getByRole("region");
      expect(Content).toBeDefined();
      expect(Content.getAttribute("aria-expanded")).toBe("true");
      expect(Content.getAttribute("data-value")).toBe("1");
      expect(Content.getAttribute("aria-labelledby")).toBeDefined();
      expect(Content.getAttribute("id")).toBeDefined();
    });
  });
  it("Fires the defined callback function and toggle the content when the trigger is clicked", async () => {
    const onClickCallback = jest.fn();
    render(
      <SystemThemeProvider>
        <Accordion.Root>
          <Accordion>
            <Accordion.Trigger
              onClick={onClickCallback}
              value="1"
              name="trigger-1"
            >
              Trigger 1
            </Accordion.Trigger>
            <Accordion.Trigger value="2" name="trigger-2">
              Trigger 2
            </Accordion.Trigger>
            <Accordion.Content value="1" defaultOpen>
              Content 1
            </Accordion.Content>
            <Accordion.Content value="2">Content 2</Accordion.Content>
          </Accordion>
        </Accordion.Root>
      </SystemThemeProvider>
    );

    expect(screen.getByText("Content 1")).toBeDefined();

    fireEvent.click(screen.getByLabelText("trigger-2-action"));
    await waitFor(() => {
      expect(() => screen.getByText("Content 1")).toThrow();
      expect(screen.getByText("Content 2")).toBeDefined();
    });

    fireEvent.click(screen.getByLabelText("trigger-1-action"));
    await waitFor(() => {
      expect(() => screen.getByText("Content 2")).toThrow();
      expect(screen.getByText("Content 1")).toBeDefined();
      expect(onClickCallback).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(screen.getByLabelText("trigger-1-action"));
    await waitFor(() => {
      expect(() => screen.getByText("Content 1")).toThrow();
      expect(() => screen.getByText("Content 2")).toThrow();
    });
  });
});
