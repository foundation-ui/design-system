import { test, vi, afterEach, describe, expect } from "vitest";

import {
  GetTokenFromSource,
  GetColorTokenBase,
} from "../../src/services/get-token";
import { default as js_design_tokens } from "../../src/assets/js/ds-tokens";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe("GetColorTokenBase", () => {
  test("Returns a Color Design Tokens Base value from a structured source", () => {
    expect(
      GetColorTokenBase({
        source: js_design_tokens,
        token_category: "color",
        query: "mono-dark",
      })
    ).toEqual("#1d1b15");
  });
  test("Return a specific format", () => {
    expect(
      GetColorTokenBase({
        source: js_design_tokens,
        token_category: "color",
        query: "mono-dark",
        unit: "rgb",
      })
    ).toEqual("rgb(29, 27, 21)");
  });
});
describe("GetTokenFromSource", () => {
  test("Returns a Design Tokens definition from a structured source", () => {
    expect(
      GetTokenFromSource({
        source: js_design_tokens,
        token_category: "color",
        query: "mono-dark",
      })
    ).toEqual({
      name: "mono-dark",
      base: {
        hex: "#1d1b15",
        rgb: "rgb(29, 27, 21)",
        hsl: "hsl(45deg 16% 10%)",
        contrast_score: { light: "AAA", dark: "F" },
      },
      alpha: [
        {
          hex: "#1d1b1510",
          rgb: "rgba(29, 27, 21, 0.1)",
          hsl: "hsl(45deg 16% 10% / 10%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#1d1b1520",
          rgb: "rgba(29, 27, 21, 0.2)",
          hsl: "hsl(45deg 16% 10% / 20%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#1d1b1530",
          rgb: "rgba(29, 27, 21, 0.3)",
          hsl: "hsl(45deg 16% 10% / 30%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#1d1b1540",
          rgb: "rgba(29, 27, 21, 0.4)",
          hsl: "hsl(45deg 16% 10% / 40%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#1d1b1550",
          rgb: "rgba(29, 27, 21, 0.5)",
          hsl: "hsl(45deg 16% 10% / 50%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#1d1b1560",
          rgb: "rgba(29, 27, 21, 0.6)",
          hsl: "hsl(45deg 16% 10% / 60%)",
          contrast_score: { light: "AA", dark: "F" },
        },
        {
          hex: "#1d1b1570",
          rgb: "rgba(29, 27, 21, 0.7)",
          hsl: "hsl(45deg 16% 10% / 70%)",
          contrast_score: { light: "AA", dark: "F" },
        },
        {
          hex: "#1d1b1580",
          rgb: "rgba(29, 27, 21, 0.8)",
          hsl: "hsl(45deg 16% 10% / 80%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#1d1b1590",
          rgb: "rgba(29, 27, 21, 0.9)",
          hsl: "hsl(45deg 16% 10% / 90%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#1d1b15",
          rgb: "rgba(29, 27, 21, 1)",
          hsl: "hsl(45deg 16% 10% / 100%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
      ],
      tint: [],
      shade: [],
    });
  });
});
