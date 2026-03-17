import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Shimmer } from "../../src/shimmer";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

expect.extend(toHaveNoViolations);

describe("Shimmer", () => {
  test("Renders without accessibility violations", async () => {
    const { container } = render(<Shimmer>Loading your content…</Shimmer>);

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });

  test("Renders with accessibility definition", () => {
    render(<Shimmer>Loading your content…</Shimmer>);

    const shimmer = screen.getByLabelText("shimmer-text");
    expect(shimmer).toBeDefined();
  });

  test("Renders children correctly", () => {
    render(<Shimmer>Loading your content…</Shimmer>);

    expect(screen.getByText("Loading your content…")).toBeDefined();
  });

  test("Applies correct data attributes for default props", () => {
    render(<Shimmer>Default shimmer</Shimmer>);

    const shimmer = screen.getByLabelText("shimmer-text");
    expect(shimmer.getAttribute("data-raw")).toBe("false");
    expect(shimmer.getAttribute("data-duration")).toBe("2");
    expect(shimmer.getAttribute("data-spread")).toBe("200");
    expect(shimmer.getAttribute("data-shimmer-color")).toBe(
      "var(--font-color-alpha-60)",
    );
    expect(shimmer.getAttribute("data-base-color")).toBe(
      "var(--font-color-alpha-30)",
    );
  });

  test("Applies correct data attributes for custom props", () => {
    render(
      <Shimmer
        duration={5}
        spread={300}
        shimmerColor="var(--color-brand-alpha-80)"
        baseColor="var(--color-brand-alpha-30)"
      >
        Custom shimmer
      </Shimmer>,
    );

    const shimmer = screen.getByLabelText("shimmer-text");
    expect(shimmer.getAttribute("data-duration")).toBe("5");
    expect(shimmer.getAttribute("data-spread")).toBe("300");
    expect(shimmer.getAttribute("data-shimmer-color")).toBe(
      "var(--color-brand-alpha-80)",
    );
    expect(shimmer.getAttribute("data-base-color")).toBe(
      "var(--color-brand-alpha-30)",
    );
  });

  test("Applies data-raw attribute when raw prop is true", () => {
    render(<Shimmer raw>Raw shimmer</Shimmer>);

    const shimmer = screen.getByLabelText("shimmer-text");
    expect(shimmer.getAttribute("data-raw")).toBe("true");
  });

  test("Renders with a custom aria-label", () => {
    render(
      <Shimmer aria-label="custom-shimmer-label">Accessible shimmer</Shimmer>,
    );

    expect(screen.getByLabelText("custom-shimmer-label")).toBeDefined();
    expect(() => screen.getByLabelText("shimmer-text")).toThrow();
  });

  test("Renders multiple instances independently", () => {
    render(
      <React.Fragment>
        <Shimmer aria-label="shimmer-1">First</Shimmer>
        <Shimmer aria-label="shimmer-2" duration={5}>
          Second
        </Shimmer>
      </React.Fragment>,
    );

    const first = screen.getByLabelText("shimmer-1");
    const second = screen.getByLabelText("shimmer-2");

    expect(first).toBeDefined();
    expect(second).toBeDefined();
    expect(first.getAttribute("data-duration")).toBe("2");
    expect(second.getAttribute("data-duration")).toBe("5");
  });

  test("Forwards extra HTML span attributes", () => {
    render(
      <Shimmer id="my-shimmer" className="custom-class">
        Forwarded attrs
      </Shimmer>,
    );

    const shimmer = screen.getByLabelText("shimmer-text");
    expect(shimmer.getAttribute("id")).toBe("my-shimmer");
    expect(shimmer.getAttribute("class")).toContain("custom-class");
  });
});
