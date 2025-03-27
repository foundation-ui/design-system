import { test, describe, expect, afterEach, vi } from "vitest";
import { generateCSSVariables } from "../";

afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe("generateCSSVariables", () => {
  const mockDesignTokens: any = {
    design_tokens: {
      color: [
        {
          name: "primary",
          base: { hex: "#007bff", rgb: "rgb(0, 123, 255)", hsl: "" },
          alpha: [
            { hex: "#007bff10", rgb: "rgba(0, 123, 255, 0.1)", hsl: "" },
            { hex: "#007bff20", rgb: "rgba(0, 123, 255, 0.2)", hsl: "" },
          ],
          tint: [
            { hex: "#3395ff", rgb: "rgb(51, 149, 255)", hsl: "" },
            { hex: "#66adff", rgb: "rgb(102, 173, 255)", hsl: "" },
          ],
          shade: [
            { hex: "#0062cc", rgb: "rgb(0, 98, 204)", hsl: "" },
            { hex: "#004999", rgb: "rgb(0, 73, 153)", hsl: "" },
          ],
        },
        {
          name: "secondary",
          base: { hex: "#6c757d", rgb: "rgb(108, 117, 125)", hsl: "" },
          alpha: [
            { hex: "#6c757d10", rgb: "rgba(108, 117, 125, 0.1)", hsl: "" },
            { hex: "#6c757d20", rgb: "rgba(108, 117, 125, 0.2)", hsl: "" },
          ],
          tint: [
            { hex: "#878e95", rgb: "rgb(135, 142, 149)", hsl: "" },
            { hex: "#a2a7ac", rgb: "rgb(162, 167, 172)", hsl: "" },
          ],
          shade: [
            { hex: "#545b62", rgb: "rgb(84, 91, 98)", hsl: "" },
            { hex: "#3c4146", rgb: "rgb(60, 65, 70)", hsl: "" },
          ],
        },
      ],
      fontsize: [
        {
          name: "small",
          base: 6,
          units: 10,
          ratio: 1.13,
          values: [{ px: 1.13, rem: 0.070625, pt: 0.8474999999999999 }],
        },
      ],
      measurement: [
        {
          name: "spacing",
          base: 1,
          units: 10,
          ratio: 1.13,
          values: [{ px: 1.13, rem: 0.070625, pt: 0.8474999999999999 }],
        },
      ],
      depth: [
        {
          name: "level1",
          base: 10,
          units: 10,
          steps: 10,
          values: [
            {
              value: 10,
              usage: ["base", "toolbar", "dropdown"],
              stack_order: { label: "low", score: 1 },
            },
          ],
        },
      ],
      opacity: [
        {
          name: "strong",
          base: 1,
          units: 10,
          steps: 10,
          values: [
            {
              value: 0.1,
              usage: ["backdrop", "transparent"],
              contrast_score: { light: "F", dark: "F" },
            },
          ],
        },
      ],
    },
  };

  test("Generates CSS variables for colors, alpha, tint, and shade", () => {
    const cssVariables = generateCSSVariables(mockDesignTokens) as any;

    expect(cssVariables.color[0]).toContain("--color-primary: #007bff;");
    expect(cssVariables.color[1]).toContain("--color-secondary: #6c757d;");

    expect(cssVariables.alpha[0][0]).toContain(
      "--alpha-primary-10: rgba(0, 123, 255, 0.1);"
    );
    expect(cssVariables.alpha[0][1]).toContain(
      "--alpha-primary-20: rgba(0, 123, 255, 0.2);"
    );
    expect(cssVariables.alpha[1][0]).toContain(
      "--alpha-secondary-10: rgba(108, 117, 125, 0.1);"
    );
    expect(cssVariables.alpha[1][1]).toContain(
      "--alpha-secondary-20: rgba(108, 117, 125, 0.2);"
    );

    expect(cssVariables.tint[0][0]).toContain(
      "--tint-primary-10: rgb(51, 149, 255);"
    );
    expect(cssVariables.tint[0][1]).toContain(
      "--tint-primary-20: rgb(102, 173, 255);"
    );
    expect(cssVariables.tint[1][0]).toContain(
      "--tint-secondary-10: rgb(135, 142, 149);"
    );
    expect(cssVariables.tint[1][1]).toContain(
      "--tint-secondary-20: rgb(162, 167, 172);"
    );

    expect(cssVariables.shade[0][0]).toContain(
      "--shade-primary-10: rgb(0, 98, 204);"
    );
    expect(cssVariables.shade[0][1]).toContain(
      "--shade-primary-20: rgb(0, 73, 153);"
    );
    expect(cssVariables.shade[1][0]).toContain(
      "--shade-secondary-10: rgb(84, 91, 98);"
    );
    expect(cssVariables.shade[1][1]).toContain(
      "--shade-secondary-20: rgb(60, 65, 70);"
    );
  });

  test("Generates CSS variables for font sizes and measurements", () => {
    const cssVariables = generateCSSVariables(mockDesignTokens) as any;

    expect(cssVariables.fontsize[0][0]).toContain(
      "--fontsize-small-10: 0.070625rem;"
    );
    expect(cssVariables.measurement[0][0]).toContain(
      "--measurement-spacing-10: 0.070625rem;"
    );
  });

  test("Generates CSS variables for depth and opacity", () => {
    const cssVariables = generateCSSVariables(mockDesignTokens) as any;

    expect(cssVariables.depth[0][0]).toContain("--depth-level1-10: 10;");
    expect(cssVariables.opacity[0][0]).toContain("--opacity-strong-10: 0.1;");
  });
});
