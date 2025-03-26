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
    ).toEqual("#212121");
  });
  test("Return a specific format", () => {
    expect(
      GetColorTokenBase({
        source: js_design_tokens,
        token_category: "color",
        query: "mono-dark",
        unit: "rgb",
      })
    ).toEqual("rgb(33, 33, 33)");
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
        hex: "#212121",
        rgb: "rgb(33, 33, 33)",
        hsl: "rgb(33, 33, 33)",
        contrast_score: { light: "AAA", dark: "F" },
      },
      alpha: [
        {
          hex: "#21212110",
          rgb: "rgba(33, 33, 33, 0.1)",
          hsl: "hsl(0deg 0% 13% / 10%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#21212120",
          rgb: "rgba(33, 33, 33, 0.2)",
          hsl: "hsl(0deg 0% 13% / 20%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#21212130",
          rgb: "rgba(33, 33, 33, 0.3)",
          hsl: "hsl(0deg 0% 13% / 30%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#21212140",
          rgb: "rgba(33, 33, 33, 0.4)",
          hsl: "hsl(0deg 0% 13% / 40%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#21212150",
          rgb: "rgba(33, 33, 33, 0.5)",
          hsl: "hsl(0deg 0% 13% / 50%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#21212160",
          rgb: "rgba(33, 33, 33, 0.6)",
          hsl: "hsl(0deg 0% 13% / 60%)",
          contrast_score: { light: "F", dark: "F" },
        },
        {
          hex: "#21212170",
          rgb: "rgba(33, 33, 33, 0.7)",
          hsl: "hsl(0deg 0% 13% / 70%)",
          contrast_score: { light: "AA", dark: "F" },
        },
        {
          hex: "#21212180",
          rgb: "rgba(33, 33, 33, 0.8)",
          hsl: "hsl(0deg 0% 13% / 80%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#21212190",
          rgb: "rgba(33, 33, 33, 0.9)",
          hsl: "hsl(0deg 0% 13% / 90%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#212121",
          rgb: "rgba(33, 33, 33, 1)",
          hsl: "hsl(0deg 0% 13% / 100%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
      ],
      tint: [],
      shade: [],
    });
  });
});
