import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Button } from "../";
import { SystemThemeProvider } from "@foundation-ui/core";
import { ComponentVariantEnum } from "../../../../../../types";
import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);
const handleClick = jest.fn();

describe("Button", () => {
  it("Renders with accessibility definition", async () => {
    render(
      <SystemThemeProvider>
        <Button onClick={handleClick}>Test</Button>
      </SystemThemeProvider>
    );

    const ButtonComponent = screen.getByRole("button");

    expect(ButtonComponent).toHaveTextContent("Test");
    expect(ButtonComponent).toHaveAttribute("type", "button");
    expect(ButtonComponent).toHaveAttribute("tabIndex", "0");
    expect(ButtonComponent).toHaveAttribute("name", "button");
    expect(ButtonComponent).toHaveAttribute("aria-disabled", "false");
    expect(ButtonComponent).toHaveAttribute("aria-label", "button-action");
    expect(ButtonComponent).toHaveAttribute("data-size", "medium");
    expect(ButtonComponent).toHaveAttribute("data-raw", "false");

    expect(ButtonComponent).toHaveAttribute(
      "aria-description",
      "button-action:button/disabled:false"
    );
  });
  it("Renders variants without accessibility violation", async () => {
    const ButtonsVariants = [
      ComponentVariantEnum.Primary,
      ComponentVariantEnum.Secondary,
      ComponentVariantEnum.Tertiary,
      ComponentVariantEnum.Ghost,
    ];

    const { container } = render(
      <SystemThemeProvider>
        {ButtonsVariants.map((variant) => (
          <Button
            key={variant}
            name={`test-styled-${variant}`}
            variant={variant}
          >
            {variant}
          </Button>
        ))}
      </SystemThemeProvider>
    );

    const ComponentContainer = await axe(container);
    expect(ComponentContainer).toHaveNoViolations();

    ButtonsVariants.map((variant) => {
      expect(
        screen.getByLabelText(`test-styled-${variant}-action`)
      ).toHaveAttribute("data-variant", variant);
    });
  });
  it("Renders without accessibility violation", async () => {
    const { container } = render(
      <SystemThemeProvider>
        <Button name="test" onClick={handleClick}>
          Test
        </Button>
      </SystemThemeProvider>
    );
    const ComponentContainer = await axe(container);
    const ButtonComponent = screen.getByRole("button");

    expect(ComponentContainer).toHaveNoViolations();
    act(() => {
      fireEvent.click(ButtonComponent);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
