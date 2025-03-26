import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { Portal } from "../../src/portal";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

const PortalDefault = () => {
  return (
    <React.Fragment>
      <Portal container="portal">portal-content</Portal>
      <div aria-label="test-portal" id="portal" />
    </React.Fragment>
  );
};

describe("Portal", () => {
  test("Renders in the dedicated container", async () => {
    render(<PortalDefault />);
    expect(screen.getByLabelText("test-portal")).toBeDefined();
    expect(screen.getByText("portal-content")).toBeDefined();
  });
});
