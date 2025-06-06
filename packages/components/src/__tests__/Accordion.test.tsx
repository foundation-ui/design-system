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

import { Accordion } from "../../src/accordion";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

expect.extend(toHaveNoViolations);
describe("Accordion", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(
      <Accordion.Root>
        <Accordion>
          <Accordion.Trigger value="1">1</Accordion.Trigger>
          <Accordion.Content value="1" defaultOpen>
            2
          </Accordion.Content>
        </Accordion>
      </Accordion.Root>
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", async () => {
    render(
      <Accordion.Root>
        <Accordion>
          <Accordion.Trigger value="1">1</Accordion.Trigger>
          <Accordion.Content value="1">1</Accordion.Content>
        </Accordion>
      </Accordion.Root>
    );
    const Trigger = screen.getByLabelText("button-action");

    expect(Trigger).toBeDefined();
    expect(() => screen.getByRole("article")).toThrow();

    fireEvent.click(Trigger);
    await waitFor(() => {
      const Content = screen.getByRole("article");
      expect(Content).toBeDefined();
      expect(Content.getAttribute("aria-expanded")).toBe("true");
      expect(Content.getAttribute("data-value")).toBe("1");
      expect(Content.getAttribute("aria-labelledby")).toBeDefined();
      expect(Content.getAttribute("id")).toBeDefined();
    });
  });
  test("Fires the defined callback function and toggle the content when the trigger is clicked", async () => {
    const onClickCallback = vi.fn();
    render(
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
