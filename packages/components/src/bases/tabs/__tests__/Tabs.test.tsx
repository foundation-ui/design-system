import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Tabs } from "../";
import { SystemThemeProvider } from "@bsw/ds-core";
import "@testing-library/jest-dom";

const onClickCallback = jest.fn();
const TabsDefault = () => {
  return (
    <SystemThemeProvider>
      <Tabs.Root>
        <Tabs>
          <Tabs.Trigger value="1">trigger 1</Tabs.Trigger>
          <Tabs.Trigger onClick={onClickCallback} value="2">
            trigger 2
          </Tabs.Trigger>
        </Tabs>
        <Tabs.Content value="1">
          <p>item 1</p>
        </Tabs.Content>
        <Tabs.Content value="2">
          <p>item 2</p>
        </Tabs.Content>
      </Tabs.Root>
    </SystemThemeProvider>
  );
};

expect.extend(toHaveNoViolations);
describe("Tabs", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<TabsDefault />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(<TabsDefault />);
    const Trigger = screen.getByTitle("1-tab");
    const Content = screen.getByTitle("1-tabpanel");
    const ScndTrigger = screen.getByTitle("2-tab");
    const ScndContent = screen.getByTitle("2-tabpanel");

    expect(Trigger.getAttribute("role")).toBe("tab");
    expect(Trigger.getAttribute("value")).toBe("1");
    expect(Trigger.getAttribute("aria-selected")).toBe("true");
    expect(Trigger.getAttribute("data-state")).toBe("active");
    expect(Trigger.getAttribute("data-controls")).toBeDefined();

    expect(Content.getAttribute("role")).toBe("tabpanel");
    expect(Content.getAttribute("data-value")).toBe("1");
    expect(Content.getAttribute("data-state")).toBe("active");
    expect(Content.getAttribute("aria-labelledby")).toBeDefined();

    expect(ScndTrigger.getAttribute("aria-selected")).toBe("false");
    expect(ScndTrigger.getAttribute("data-state")).toBe("inactive");
    expect(ScndContent.getAttribute("data-state")).toBe("inactive");
  });
  it("Update the component state on click and fires the defined callback function", async () => {
    render(<TabsDefault />);
    const Trigger = screen.getByTitle("1-tab");
    const Content = screen.getByTitle("1-tabpanel");
    const ScndTrigger = screen.getByTitle("2-tab");
    const ScndContent = screen.getByTitle("2-tabpanel");

    expect(screen.getByText("item 1")).toBeInTheDocument();
    fireEvent.click(ScndTrigger);
    await waitFor(() => {
      expect(Trigger.getAttribute("aria-selected")).toBe("false");
      expect(Trigger.getAttribute("data-state")).toBe("inactive");
      expect(Content.getAttribute("data-state")).toBe("inactive");

      expect(ScndTrigger.getAttribute("aria-selected")).toBe("true");
      expect(ScndTrigger.getAttribute("data-state")).toBe("active");
      expect(ScndContent.getAttribute("data-state")).toBe("active");

      expect(onClickCallback).toHaveBeenCalled();
      expect(onClickCallback).toHaveBeenCalledTimes(1);

      expect(() => screen.getByText("item 1")).toThrow();
      expect(screen.getByText("item 2")).toBeVisible();
    });
  });
  it("Renders the desired section as open if defaultOpen is defined", async () => {
    render(
      <SystemThemeProvider>
        <Tabs.Root>
          <Tabs defaultOpen="2">
            <Tabs.Trigger value="1">trigger 1</Tabs.Trigger>
            <Tabs.Trigger onClick={onClickCallback} value="2">
              trigger 2
            </Tabs.Trigger>
          </Tabs>
          <Tabs.Content value="1">
            <p>item 1</p>
          </Tabs.Content>
          <Tabs.Content value="2">
            <p>item 2</p>
          </Tabs.Content>
        </Tabs.Root>
      </SystemThemeProvider>
    );
    const Trigger = screen.getByTitle("1-tab");
    const Content = screen.getByTitle("1-tabpanel");
    const ScndTrigger = screen.getByTitle("2-tab");
    const ScndContent = screen.getByTitle("2-tabpanel");

    expect(Trigger.getAttribute("aria-selected")).toBe("false");
    expect(Trigger.getAttribute("data-state")).toBe("inactive");
    expect(Content.getAttribute("data-state")).toBe("inactive");

    expect(ScndTrigger.getAttribute("aria-selected")).toBe("true");
    expect(ScndTrigger.getAttribute("data-state")).toBe("active");
    expect(ScndContent.getAttribute("data-state")).toBe("active");

    expect(() => screen.getByText("item 1")).toThrow();
    expect(screen.getByText("item 2")).toBeVisible();
  });
});
