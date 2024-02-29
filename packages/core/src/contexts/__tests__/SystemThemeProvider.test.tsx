import React from "react";
import styled from "styled-components";
import { render, screen } from "@testing-library/react";
import { SystemThemeProvider } from "../SystemThemeProvider";
import { ColorModeProvider } from "../ColorModeProvider";
import "@testing-library/jest-dom";

const ThemeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.body.base};
`;
const Component = () => <ThemeContainer data-testid="color-mode" />;

describe("SystemThemeProvider", () => {
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

  it("Initialize with the default themes", () => {
    render(
      <ColorModeProvider>
        <SystemThemeProvider>
          <Component />
        </SystemThemeProvider>
      </ColorModeProvider>
    );

    const containerComponent = screen.getByTestId("color-mode");
    expect(containerComponent).toHaveStyle(
      "background-color: rgb(241, 241, 241);"
    );
  });
  it("Initialize with a cutom theme", () => {
    render(
      <ColorModeProvider>
        <SystemThemeProvider theme={{ colors: { body: { base: "blue" } } }}>
          <Component />
        </SystemThemeProvider>
      </ColorModeProvider>
    );

    const containerComponent = screen.getByTestId("color-mode");
    expect(containerComponent).toHaveStyle("background-color: blue;");
  });
});
