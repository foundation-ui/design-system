import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Dialog } from "..";

const onClickCallback = jest.fn();
const onClickCallbackInner = jest.fn();
const onClickCallbackOverlay = jest.fn();
const DialogDefault = (args: { open?: boolean; closeOnInteract?: boolean }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger name="external" onClick={onClickCallback}>
        Ext Trigger
      </Dialog.Trigger>

      <Dialog open={args.open} aria-label="test-dialog">
        <h4>Dialog component</h4>
        <Dialog.Menu>
          <Dialog.Control name="inner" onClick={onClickCallbackInner}>
            Close
          </Dialog.Control>
        </Dialog.Menu>
      </Dialog>
      <Dialog.Overlay
        aria-label="overlay"
        closeOnInteract={Boolean(args.closeOnInteract)}
        onClick={onClickCallbackOverlay}
      />
    </Dialog.Root>
  );
};

expect.extend(toHaveNoViolations);
describe("Dialog", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<DialogDefault open />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(<DialogDefault />);
    const ExtTrigger = screen.getByLabelText("external-action");

    expect(ExtTrigger.getAttribute("aria-expanded")).toBe("false");
    expect(ExtTrigger.getAttribute("data-state")).toBe("closed");

    fireEvent.click(ExtTrigger);
    await waitFor(() => {
      const Content = screen.getByLabelText("test-dialog");
      const InnerTrigger = screen.getByLabelText("inner-action");

      expect(ExtTrigger.getAttribute("aria-expanded")).toBe("true");
      expect(ExtTrigger.getAttribute("data-state")).toBe("open");

      expect(InnerTrigger.getAttribute("aria-expanded")).toBe("true");
      expect(InnerTrigger.getAttribute("data-state")).toBe("open");

      expect(Content.getAttribute("role")).toBe("dialog");
      expect(Content.getAttribute("data-state")).toBe("open");
      expect(Content.getAttribute("tabIndex")).toBe("-1");
      expect(Content.getAttribute("aria-labelledby")).toBeDefined();
    });
  });
  it("Fires the defined callback functions and toggle the content when the triggers are clicked", async () => {
    render(<DialogDefault />);

    fireEvent.click(screen.getByLabelText("external-action"));
    await waitFor(() => expect(onClickCallback).toHaveBeenCalled());

    fireEvent.click(screen.getByLabelText("inner-action"));
    await waitFor(() => expect(onClickCallbackInner).toHaveBeenCalled());
  });
  it("Renders the component by default if open is defined", async () => {
    render(<DialogDefault open />);
    await waitFor(() =>
      expect(screen.getByLabelText("test-dialog")).toBeDefined()
    );
  });
  it("Removes the component from the DOM if the Overlay is clicked and closeOnInteract is defined", async () => {
    render(<DialogDefault open closeOnInteract />);
    await waitFor(() => {
      const Overlay = screen.getByLabelText("overlay");

      expect(Overlay).toBeDefined();
      expect(Overlay.getAttribute("aria-hidden")).toBe("true");
    });

    fireEvent.click(screen.getByLabelText("overlay"));
    expect(onClickCallbackOverlay).toHaveBeenCalled();
    expect(() => screen.getByRole("region")).toThrow();
    expect(() => screen.getByLabelText("overlay")).toThrow();
  });
});
