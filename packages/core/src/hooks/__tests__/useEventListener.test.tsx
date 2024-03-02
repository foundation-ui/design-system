import React, { useRef } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import useEventListener from "../useEventListener";

const handler = jest.fn();
describe("useEventListener", () => {
  afterEach(() => jest.clearAllMocks());

  it("Call the handler function when the event is triggered on the window", () => {
    const Component = () => {
      useEventListener("resize", handler);
      return <div>Test Component</div>;
    };

    render(<Component />);
    act(() => window.dispatchEvent(new Event("resize")));

    expect(handler).toHaveBeenCalledTimes(1);
  });
  it("Call the handler function when the event is triggered on the element", () => {
    const Component = () => {
      const ref = useRef<HTMLDivElement>(null);
      useEventListener("click", handler, ref);
      return <div ref={ref}>Test Component</div>;
    };

    render(<Component />);
    fireEvent.click(screen.getByText("Test Component"));

    expect(handler).toHaveBeenCalledTimes(1);
  });
  it("Do not call the handler function when the event is triggered on a different element", () => {
    const Component = () => {
      const ref = useRef<HTMLDivElement>(null);
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
  it("Clean up the event listener when the component unmounts", () => {
    const Component = () => {
      useEventListener("resize", handler);
      return <div>Test Component</div>;
    };

    const { unmount } = render(<Component />);
    act(() => window.dispatchEvent(new Event("resize")));

    unmount();
    act(() => window.dispatchEvent(new Event("resize")));

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
