import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import { useKeyPress } from "../useKeyPress";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const Single = () => {
  const keyPressed = useKeyPress("a");
  return <div>{keyPressed ? "Key pressed" : "Key not pressed"}</div>;
};
const Hotkey = () => {
  const keyPressed = useKeyPress("a", true);
  return <div>{keyPressed ? "Key pressed" : "Key not pressed"}</div>;
};
const Bindkey = () => {
  const keyPressed = useKeyPress("a", true, "ctrlKey");
  return <div>{keyPressed ? "Key pressed" : "Key not pressed"}</div>;
};

describe("useKeyPress", () => {
  test("Return false if the target key is not pressed", () => {
    render(<Single />);

    expect(screen.getByText("Key not pressed")).toBeDefined();
  });
  test("Return true if the target key is pressed", () => {
    render(<Single />);

    fireEvent.keyDown(window, { key: "a" });
    expect(screen.getByText("Key pressed")).toBeDefined();
  });
  test("Return false if the target key is released", () => {
    render(<Single />);

    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyUp(window, { key: "a" });
    expect(screen.getByText("Key not pressed")).toBeDefined();
  });
  test("Return true if the target key is pressed with a hotkey", () => {
    render(<Hotkey />);

    fireEvent.keyDown(window, { key: "a", metaKey: true });
    expect(screen.getByText("Key pressed")).toBeDefined();
  });
  test("Return false if the target key is pressed without a hotkey", () => {
    render(<Hotkey />);

    fireEvent.keyDown(window, { key: "a" });
    expect(screen.getByText("Key not pressed")).toBeDefined();
  });
  test("Return true if the target key is pressed with a custom hotkey", () => {
    render(<Bindkey />);

    fireEvent.keyDown(window, { key: "a", ctrlKey: true });
    expect(screen.getByText("Key pressed")).toBeDefined();
  });
  test("Return false if the target key is pressed without a custom hotkey", () => {
    render(<Bindkey />);

    fireEvent.keyDown(window, { key: "a" });
    expect(screen.getByText("Key not pressed")).toBeDefined();
  });
});
