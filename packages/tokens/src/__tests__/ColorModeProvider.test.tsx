import React from "react";

import { test, vi, beforeEach, afterEach, describe, expect } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import { ColorModeProvider, useColorMode } from "../../src";
import { ColorModesEnum } from "../../../../types";

const STORAGE_KEY = "color-mode";

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: query.includes("dark") ? matches : !matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

const mockLocalStorage = () => {
  let storage: Record<string, string> = {};

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: vi.fn((key: string) => storage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        storage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete storage[key];
      }),
      clear: vi.fn(() => {
        storage = {};
      }),
    },
    writable: true,
  });
};

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

beforeEach(() => {
  mockMatchMedia(true); // Default to dark mode
  mockLocalStorage();
});

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
  cleanup();
});

describe("ColorModeContext", () => {
  test("Initialize with system preferred mode", () => {
    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    expect(screen.getByTestId("set-color-mode").textContent).toBe(
      ColorModesEnum.Dark
    );
  });
  test("Switch and persist color mode", () => {
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
  test("Load color mode from localStorage", () => {
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
  test("Respect explicit color mode prop", () => {
    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    expect(screen.getByTestId("set-color-mode").textContent).toBe(
      ColorModesEnum.Dark
    );
  });
  test("Update document attribute on mode change", () => {
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
