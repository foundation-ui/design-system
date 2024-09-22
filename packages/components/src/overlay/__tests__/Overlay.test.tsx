import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Overlay } from "..";
import "@testing-library/jest-dom";

const onClickCallback = jest.fn();
const OverlayDefault = (args: {
  visible?: boolean;
  closeOnInteract?: boolean;
}) => {
  return (
    <Overlay
      visible={args.visible}
      closeOnInteract={Boolean(args.closeOnInteract)}
      onClick={onClickCallback}
      aria-label="test-overlay"
    >
      overlay
    </Overlay>
  );
};

expect.extend(toHaveNoViolations);
describe("Overlay", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(<OverlayDefault visible />);
    const ComponentContainer = await axe(container);

    expect(ComponentContainer).toHaveNoViolations();
  });
  it("Renders with accessibility definition", async () => {
    render(<OverlayDefault visible />);
    const OverlayComponent = screen.getByLabelText("test-overlay");

    expect(OverlayComponent.getAttribute("tabIndex")).toBe("-1");
    expect(OverlayComponent.getAttribute("aria-hidden")).toBe("true");
  });
  it("Does not render by default is visible is falsy", async () => {
    render(<OverlayDefault visible={false} />);
    expect(() => screen.getByLabelText("test-overlay")).toThrow();
  });
  it("Update the component state on click and fires the defined callback function", async () => {
    render(<OverlayDefault visible closeOnInteract />);
    const OverlayComponent = screen.getByLabelText("test-overlay");

    expect(OverlayComponent).toBeDefined();
    fireEvent.click(OverlayComponent);

    await waitFor(() => {
      expect(() => screen.getByLabelText("test-overlay")).toThrow();
      expect(onClickCallback).toHaveBeenCalled();
      expect(onClickCallback).toHaveBeenCalledTimes(1);
    });
  });
});
