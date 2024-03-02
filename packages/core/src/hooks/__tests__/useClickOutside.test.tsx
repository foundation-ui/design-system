import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useClickOutside } from "../useClickOutside";

const handler = jest.fn();
const Component = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside<HTMLDivElement>(ref, handler);

  return <div ref={ref}>Test Component</div>;
};

describe("useClickOutside", () => {
  afterEach(() => jest.clearAllMocks());

  it("Call the handler function when clicking outside the element", () => {
    const { container } = render(<Component />);
    fireEvent.mouseDown(container, { clientX: 0, clientY: 0 });

    expect(handler).toHaveBeenCalledTimes(1);
  });
  it("Do not call the handler function when clicking inside the element", () => {
    render(<Component />);

    fireEvent.mouseDown(screen.getByText("Test Component"), {
      clientX: 0,
      clientY: 0,
    });
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
