import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Collapsible } from "../";
import { SystemThemeProvider } from "@foundation/core";

const onClickCallback = jest.fn();
const CollapsibleDefault = (args: {
  defaultOpen?: boolean;
  showFirstChild?: boolean;
}) => {
  return (
    <SystemThemeProvider>
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
    </SystemThemeProvider>
  );
};

expect.extend(toHaveNoViolations);
describe("Collapsible", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<CollapsibleDefault />);
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", () => {
    render(<CollapsibleDefault />);
    const TriggerComponent = screen.getByRole("button");

    expect(TriggerComponent.getAttribute("aria-disabled")).toBe("false");
    expect(TriggerComponent.getAttribute("data-expanded")).toBe("false");
    expect(TriggerComponent.getAttribute("data-state")).toBe("closed");
  });
  it("Fires the defined callback function and toggle the content when the trigger is clicked", async () => {
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
