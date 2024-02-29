import {
  applyColorLuminance,
  luminanceAmountFormatter,
  setLuminanceTone,
  getRelativeLuminance,
  generateAlpha,
  generateVariation,
} from "../colors";

describe("applyColorLuminance", () => {
  it("Increase the luminosity of a color and returns it as an hexidecimal color code", () => {
    const color = applyColorLuminance("#6f2a2a", 0.5); // 50% brighter
    expect(color).toEqual("#a73f3f");
  });
  it("Returns undefined if an invalid hexidecimal color code is provided", () => {
    const invalidColor = applyColorLuminance("#FAFA", 0.5);
    expect(invalidColor).toEqual(undefined);
  });
});
describe("setLuminanceTone", () => {
  it("Returns the input tone as is, or its negative value", () => {
    const lighten = setLuminanceTone(
      luminanceAmountFormatter([
        {
          hex: "#FFFFFF",
          rgb: "rgb(255, 255, 255)",
          hsl: "hsl(0, 0%, 100%)",
        },
      ])
    );
    const darken = setLuminanceTone(
      luminanceAmountFormatter([
        {
          hex: "#FFFFFF",
          rgb: "rgb(255, 255, 255)",
          hsl: "hsl(0, 0%, 100%)",
        },
      ]),
      "darken"
    );
    expect(lighten).toEqual(0.2);
    expect(darken).toEqual(-0.2);
  });
});
describe("luminanceAmountFormatter", () => {
  it("Returns the opacity for a given color as a normalized value going from 0 to 1", () => {
    const case01 = luminanceAmountFormatter([
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
    ]);
    const case02 = luminanceAmountFormatter([
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
      {
        hex: "#FFFFFF20",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0, 0%, 100%)",
      },
    ]);
    expect(case01).toEqual(0.2);
    expect(case02).toEqual(1);
  });
});
describe("getRelativeLuminance", () => {
  it("Returns the luminosity of an RGB color as a normalized value going from 0(lowest luminosity) to 1(highest luminosity)", () => {
    const light = getRelativeLuminance([255, 255, 255]);
    const dark = getRelativeLuminance([0, 0, 0]);

    expect(light).toEqual(1);
    expect(dark).toEqual(0);
  });
});
describe("generateAlpha", () => {
  it("Returns a set of alpha values for color design tokens", () => {
    const alpha = generateAlpha("CC0000", 1);
    const alphaArr = generateAlpha("CC0000");

    expect(alphaArr.length).toEqual(10);
    expect(alpha).toEqual([
      {
        hex: "#CC000010",
        rgb: "rgba(204, 0, 0, 0.1)",
        hsl: "hsl(0deg 100% 40% / 10%)",
        contrast_score: {
          light: "F",
          dark: "F",
        },
      },
    ]);
  });
});
describe("generateVariation", () => {
  it("Returns a set of shade and tint variations for a color design token", () => {
    const shade = generateVariation("CC0000", "darken", 1);
    const tint = generateVariation("CC0000", "lighten", 1);

    expect(generateVariation("FFFFFF", "darken").length).toBe(10);
    expect(shade).toEqual([
      {
        hex: "#b80000",
        rgb: "rgb(184, 0, 0)",
        hsl: "hsl(0deg 100% 36%)",
        contrast_score: { light: "AA", dark: "F" },
      },
    ]);
    expect(tint).toEqual([
      {
        hex: "#e00000",
        rgb: "rgb(224, 0, 0)",
        hsl: "hsl(0deg 100% 44%)",
        contrast_score: { light: "AA", dark: "F" },
      },
    ]);
  });
});
