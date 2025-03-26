import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import { useClickOutside } from "../";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const handler = vi.fn();
const Component = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside<HTMLDivElement>(ref, handler);

  return <div ref={ref}>Test Component</div>;
};

describe("useClickOutside", () => {
  test("Call the handler function when clicking outside the element", () => {
    const { container } = render(<Component />);
    fireEvent.mouseDown(container, { clientX: 0, clientY: 0 });

    expect(handler).toHaveBeenCalledTimes(1);
  });
  test("Do not call the handler function when clicking inside the element", () => {
    render(<Component />);

    fireEvent.mouseDown(screen.getByText("Test Component"), {
      clientX: 0,
      clientY: 0,
    });
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
