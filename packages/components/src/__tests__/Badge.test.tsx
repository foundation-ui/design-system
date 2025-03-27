import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Badge } from "../../src/badge";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

expect.extend(toHaveNoViolations);
const handleClick = vi.fn();

describe("Badge", () => {
  test("Renders without accessibility violation", async () => {
    const { container } = render(
      <Badge aria-label="test-badge" onClick={handleClick}>
        Test
      </Badge>
    );
    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
  test("Renders variants without accessibility violation", async () => {
    const Variants = [
      "primary",
      "secondary",
      "border",
      "error",
      "warning",
      "success",
      "meta",
    ];
    const Shapes = ["square", "smooth", "round"];

    const { container } = render(
      <React.Fragment>
        {Variants.map((variant) => (
          <Badge key={variant} variant={variant as any}>
            {variant}
          </Badge>
        ))}
        {Shapes.map((variant) => (
          <Badge key={variant} variant={variant as any}>
            {variant}
          </Badge>
        ))}
      </React.Fragment>
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();
  });
});
