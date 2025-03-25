import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ColorModeProvider, useColorMode } from "../ColorModeProvider";
import { ColorModesEnum } from "../../../../../types";

const STORAGE_KEY = "color-mode";

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query.includes("dark") ? matches : !matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

const mockLocalStorage = () => {
  let storage: Record<string, string> = {};

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn((key: string) => storage[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        storage[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete storage[key];
      }),
      clear: jest.fn(() => {
        storage = {};
      }),
    },
    writable: true,
  });
};

// Test component
const TestComponent = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <>
      <button
        data-testid="set-color-mode"
        onClick={() => setColorMode(ColorModesEnum.Light)}
      >
        {colorMode}
      </button>
    </>
  );
};

describe("ColorModeContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMatchMedia(true); // Default to dark mode
    mockLocalStorage();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Initialize with system preferred mode", () => {
    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    expect(screen.getByTestId("set-color-mode").textContent).toBe(
      ColorModesEnum.Dark
    );
  });

  it("Switch and persist color mode", () => {
    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    const button = screen.getByTestId("set-color-mode");
    expect(button.textContent).toBe(ColorModesEnum.Dark);

    fireEvent.click(button);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      ColorModesEnum.Light
    );
    expect(button.textContent).toBe(ColorModesEnum.Light);
  });

  it("Load color mode from localStorage", () => {
    localStorage.setItem(STORAGE_KEY, ColorModesEnum.Light);

    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    expect(screen.getByTestId("set-color-mode").textContent).toBe(
      ColorModesEnum.Light
    );
  });

  it("Respect explicit color mode prop", () => {
    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    expect(screen.getByTestId("set-color-mode").textContent).toBe(
      ColorModesEnum.Dark
    );
  });

  it("Update document attribute on mode change", () => {
    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    expect(document.documentElement.getAttribute("data-theme")).toBe(
      ColorModesEnum.Dark
    );

    fireEvent.click(screen.getByTestId("set-color-mode"));

    expect(document.documentElement.getAttribute("data-theme")).toBe(
      ColorModesEnum.Light
    );
  });
});
