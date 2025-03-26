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

import { Collapsible } from "../../src/collapsible";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const onClickCallback = vi.fn();
const CollapsibleDefault = (args: {
  defaultOpen?: boolean;
  showFirstChild?: boolean;
}) => {
  return (
    <Collapsible.Root>
      <Collapsible>
        <Collapsible.Trigger onClick={onClickCallback}>
          Trigger
        </Collapsible.Trigger>
        <Collapsible.Content
          defaultOpen={args.defaultOpen}
          showFirstChild={args.showFirstChild}
          aria-label="test-content"
        >
          <p key={1}>Item 1</p>
          <p key={2}>Item 2</p>
        </Collapsible.Content>
      </Collapsible>
    </Collapsible.Root>
  );
};

expect.extend(toHaveNoViolations);
describe("Collapsible", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(<CollapsibleDefault />);
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders with accessibility definition", () => {
    render(<CollapsibleDefault />);
    const TriggerComponent = screen.getByRole("button");

    expect(TriggerComponent.getAttribute("aria-disabled")).toBe("false");
    expect(TriggerComponent.getAttribute("data-expanded")).toBe("false");
    expect(TriggerComponent.getAttribute("data-state")).toBe("closed");
  });
  test("Fires the defined callback function and toggle the content when the trigger is clicked", async () => {
    render(<CollapsibleDefault showFirstChild defaultOpen />);
    const TriggerComponent = screen.getByRole("button");
    const FirstChild = screen.queryByText("Item 1");
    const ContentContainer = screen.getByLabelText("test-content");

    expect(TriggerComponent).toBeDefined();
    expect(FirstChild).toBeDefined();
    expect(ContentContainer.getAttribute("data-state")).toBe("open");

    fireEvent.click(TriggerComponent);
    await waitFor(() => {
      expect(onClickCallback).toHaveBeenCalled();

      expect(FirstChild).toBeDefined();
      expect(ContentContainer.getAttribute("data-state")).toBe("closed");
      expect(screen.queryByText("Item 2")).toBe(null);
    });
  });
});
