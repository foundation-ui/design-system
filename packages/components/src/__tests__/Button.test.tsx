import React from "react";

import { test, vi, afterEach, describe, expect } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Button } from "../../src/button";
import { ComponentVariantEnum } from "../../../../types";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

expect.extend(toHaveNoViolations);
const handleClick = vi.fn();

describe("Button", () => {
  test("Renders with accessibility definition", async () => {
    render(<Button onClick={handleClick}>Test</Button>);

    expect(screen.getByRole("button").getAttribute("type")).toEqual("button");
    expect(screen.getByRole("button").getAttribute("tabIndex")).toEqual("0");
    expect(screen.getByRole("button").getAttribute("name")).toEqual("button");
    expect(screen.getByRole("button").getAttribute("aria-disabled")).toEqual(
      "false"
    );
    expect(screen.getByRole("button").getAttribute("aria-label")).toEqual(
      "button-action"
    );
    expect(screen.getByRole("button").getAttribute("data-size")).toEqual(
      "medium"
    );
    expect(screen.getByRole("button").getAttribute("data-raw")).toEqual(
      "false"
    );
    expect(screen.getByRole("button").getAttribute("aria-description")).toEqual(
      "button-action:button/disabled:false"
    );
  });
  test("Renders variants without accessibility violation", async () => {
    const ButtonsVariants = [
      ComponentVariantEnum.Primary,
      ComponentVariantEnum.Secondary,
      ComponentVariantEnum.Tertiary,
      ComponentVariantEnum.Ghost,
    ];

    const { container } = render(
      <React.Fragment>
        {ButtonsVariants.map((variant) => (
          <Button
            key={variant}
            name={`test-styled-${variant}`}
            variant={variant}
          >
            {variant}
          </Button>
        ))}
      </React.Fragment>
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();

    ButtonsVariants.map((variant) => {
      expect(
        screen
          .getByLabelText(`test-styled-${variant}-action`)
          .getAttribute("data-variant")
      ).toBe(variant);
    });
  });
  test("Renders without accessibility violation", async () => {
    const { container } = render(
      <Button name="test" onClick={handleClick}>
        Test
      </Button>
    );
    const ComponentContainer = await axe(container);
    const ButtonComponent = screen.getByRole("button");

    expect(ComponentContainer).toHaveNoViolations();
    fireEvent.click(ButtonComponent);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
