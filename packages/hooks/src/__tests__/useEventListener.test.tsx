import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import useEventListener from "../useEventListener";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const handler = vi.fn();
describe("useEventListener", () => {
  test("Call the handler function when the event is triggered on the window", () => {
    const Component = () => {
      useEventListener("resize", handler);
      return <div>Test Component</div>;
    };

    render(<Component />);
    window.dispatchEvent(new Event("resize"));

    expect(handler).toHaveBeenCalledTimes(1);
  });
  test("Call the handler function when the event is triggered on the element", () => {
    const Component = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      useEventListener("click", handler, ref);
      return <div ref={ref}>Test Component</div>;
    };

    render(<Component />);
    fireEvent.click(screen.getByText("Test Component"));

    expect(handler).toHaveBeenCalledTimes(1);
  });
  test("Do not call the handler function when the event is triggered on a different element", () => {
    const Component = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      useEventListener("click", handler, ref);
      return (
        <React.Fragment>
          <div ref={ref}>Test Component</div>
          <button>Trigger click event</button>
        </React.Fragment>
      );
    };

    render(<Component />);
    fireEvent.click(screen.getByText("Trigger click event"));

    expect(handler).not.toHaveBeenCalled();
  });
  test("Clean up the event listener when the component unmounts", () => {
    const Component = () => {
      useEventListener("resize", handler);
      return <div>Test Component</div>;
    };

    const { unmount } = render(<Component />);
    window.dispatchEvent(new Event("resize"));

    unmount();
    window.dispatchEvent(new Event("resize"));

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
