import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "../";
import { ComponentVariantEnum } from "../../../../../../types";

import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);
const handleClick = jest.fn();

describe("Button", () => {
  it("Renders without accessibility violation", async () => {
    const { container } = render(
      <Button name="test" onClick={handleClick}>
        Test
      </Button>
    );
    const ComponentContainer = await axe(container);
    const ButtonComponent = screen.getByRole("button");

    expect(ComponentContainer).toHaveNoViolations();
    act(() => {
      fireEvent.click(ButtonComponent);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  it("Renders as Default with accessibility definition", async () => {
    render(
      <Button name="test" onClick={handleClick}>
        Test
      </Button>
    );

    const ButtonComponent = screen.getByRole("button");

    expect(ButtonComponent).not.toHaveAttribute("data-variant");
    expect(ButtonComponent).toHaveTextContent("Test");
    expect(ButtonComponent).toHaveAttribute("type", "button");
    expect(ButtonComponent).toHaveAttribute("tabIndex", "0");
    expect(ButtonComponent).toHaveAttribute("name", "test");
    expect(ButtonComponent).toHaveAttribute("aria-disabled", "false");
    expect(ButtonComponent).toHaveAttribute("aria-label", "test-action");
    expect(ButtonComponent).toHaveAttribute(
      "aria-description",
      "A button action named test-action. The action has a disabled state of: false"
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
        screen.getByLabelText(`test-styled-${variant}-action`)
      ).toHaveAttribute("data-variant", variant);
    });
  });
});
