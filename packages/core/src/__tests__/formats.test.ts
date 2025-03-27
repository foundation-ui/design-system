import { test, vi, afterEach, describe, expect } from "vitest";

import { PXToREM, PXToPT, HEXToRGB, RGBAToHEX, RGBToHSL, HEXToHSL } from "../";

afterEach(async () => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe("PXToREM", () => {
  test("Converts a Px value into Rem", () => {
    expect(PXToREM(12)).toEqual(0.75);
    expect(PXToREM(16)).toEqual(1);
  });
});
describe("PXToPT", () => {
  test("Converts a Px value into Pt", () => {
    expect(PXToPT(12)).toEqual(9);
  });
});
describe("HEXToRGB", () => {
  test("Converts an Hex value into Rgb", () => {
    expect(HEXToRGB("ffffff")).toEqual("rgb(255, 255, 255)");
  });
});
describe("RGBAToHEX", () => {
  test("Converts an Rgba value into Hex", () => {
    expect(RGBAToHEX("rgba(255, 255, 255, 0.1)", "000000")).toEqual("#1A1A1A");
  });
  test("Throws an error in the rgba format is invalid", () => {
    expect(RGBAToHEX("255, 255, 255", "000000")).toEqual(undefined);
  });
});
describe("RGBToHSL", () => {
  test("Converts an Rgb light value into Hsl", () => {
    expect(RGBToHSL(255, 255, 255)).toEqual([0, 0, 100]);
  });
  test("Converts an Rgb dark value into Hsl", () => {
    expect(RGBToHSL(0, 0, 0)).toEqual([0, 0, 0]);
  });
  test("Converts an Rgb red value into Hsl", () => {
    expect(RGBToHSL(255, 0, 0)).toEqual([0, 100, 50]);
  });
  test("Converts an Rgb green value into Hsl", () => {
    expect(RGBToHSL(0, 255, 0)).toEqual([120, 100, 50]);
  });
  test("Converts an Rgb blue value into Hsl", () => {
    expect(RGBToHSL(0, 0, 255)).toEqual([240, 100, 50]);
  });
});
describe("HEXToHSL", () => {
  test("Converts an Hex value into Hsl", () => {
    expect(HEXToHSL("ffffff")).toEqual("hsl(0deg 0% 100%)");
  });
});
