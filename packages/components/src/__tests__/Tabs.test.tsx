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

import { Tabs } from "../../src/tabs";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const onClickCallback = vi.fn();
const TabsDefault = () => {
  return (
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
  );
};

expect.extend(toHaveNoViolations);
describe("Tabs", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<TabsDefault />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", async () => {
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
  test("Update the component state on click and fires the defined callback function", async () => {
    render(<TabsDefault />);
    const Trigger = screen.getByTitle("1-tab");
    const Content = screen.getByTitle("1-tabpanel");
    const ScndTrigger = screen.getByTitle("2-tab");
    const ScndContent = screen.getByTitle("2-tabpanel");

    expect(screen.getByText("item 1")).toBeDefined();
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
      expect(screen.getByText("item 2")).toBeDefined();
    });
  });
  test("Renders the desired section as open if defaultOpen is defined", async () => {
    render(
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
    expect(screen.getByText("item 2")).toBeDefined();
  });
});
