import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ColorModeProvider, useColorMode } from "../ColorModeProvider";
import { ColorModesEnum } from "../../../../../types";

const Component = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <React.Fragment>
      <button
        data-testid="set-color-mode"
        onClick={() => setColorMode(ColorModesEnum.Dark)}
      >
        {colorMode}
      </button>
    </React.Fragment>
  );
};

describe("ColorModeContext", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
      })),
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Initialize with correct color mode", () => {
    render(
      <ColorModeProvider>
        <Component />
      </ColorModeProvider>
    );

    const colorMode = screen.getByTestId("set-color-mode");
    expect(colorMode.textContent).toBe(ColorModesEnum.Light);
  });
  it("Change color mode", () => {
    render(
      <ColorModeProvider>
        <Component />
      </ColorModeProvider>
    );
    const colorMode = screen.getByTestId("set-color-mode");
    expect(colorMode.textContent).toBe(ColorModesEnum.Light);

    fireEvent.click(colorMode);
    expect(colorMode.textContent).toBe(ColorModesEnum.Dark);
  });
  it("Persist color mode in local storage", () => {
    Storage.prototype.setItem = jest.fn();

    render(
      <ColorModeProvider>
        <Component />
      </ColorModeProvider>
    );

    const colorMode = screen.getByTestId("set-color-mode");

    fireEvent.click(colorMode);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "color-mode",
      ColorModesEnum.Dark
    );
  });
  it("Loads the defined color mode by default", () => {
    render(
      <ColorModeProvider colorMode="dark">
        <Component />
      </ColorModeProvider>
    );

    const colorMode = screen.getByTestId("set-color-mode");
    expect(colorMode.textContent).toBe(ColorModesEnum.Dark);
    expect(localStorage.getItem("color-mode")).toEqual(ColorModesEnum.Dark);
  });
});
