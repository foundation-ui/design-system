import {
  generateColorTokens,
  generateMeasurementTokens,
  generateSequenceVariation,
  generateSequenceTokens,
  generateTokensFromTemplate,
  generateTokensLibrary,
} from "../tokens";
import { generateSequences } from "../modular-sequence";

describe("generateColorTokens", () => {
  it("Generate a color Design token definition with variations", () => {
    expect(
      generateColorTokens("black", "212121", {
        alpha: true,
        tint: true,
        shade: true,
      })
    ).toEqual({
      name: "black",
      base: {
        hex: "#212121",
        rgb: "rgb(33, 33, 33)",
        hsl: "hsl(0deg 0% 13%)",
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
      tint: [
        {
          hex: "#242424",
          rgb: "rgb(36, 36, 36)",
          hsl: "hsl(0deg 0% 14%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#282828",
          rgb: "rgb(40, 40, 40)",
          hsl: "hsl(0deg 0% 16%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#2b2b2b",
          rgb: "rgb(43, 43, 43)",
          hsl: "hsl(0deg 0% 17%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#2e2e2e",
          rgb: "rgb(46, 46, 46)",
          hsl: "hsl(0deg 0% 18%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#323232",
          rgb: "rgb(50, 50, 50)",
          hsl: "hsl(0deg 0% 20%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#353535",
          rgb: "rgb(53, 53, 53)",
          hsl: "hsl(0deg 0% 21%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#383838",
          rgb: "rgb(56, 56, 56)",
          hsl: "hsl(0deg 0% 22%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#3b3b3b",
          rgb: "rgb(59, 59, 59)",
          hsl: "hsl(0deg 0% 23%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#3f3f3f",
          rgb: "rgb(63, 63, 63)",
          hsl: "hsl(0deg 0% 25%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#424242",
          rgb: "rgb(66, 66, 66)",
          hsl: "hsl(0deg 0% 26%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
      ],
      shade: [
        {
          hex: "#1e1e1e",
          rgb: "rgb(30, 30, 30)",
          hsl: "hsl(0deg 0% 12%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#1a1a1a",
          rgb: "rgb(26, 26, 26)",
          hsl: "hsl(0deg 0% 10%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#171717",
          rgb: "rgb(23, 23, 23)",
          hsl: "hsl(0deg 0% 9%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#141414",
          rgb: "rgb(20, 20, 20)",
          hsl: "hsl(0deg 0% 8%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#111111",
          rgb: "rgb(17, 17, 17)",
          hsl: "hsl(0deg 0% 7%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#0d0d0d",
          rgb: "rgb(13, 13, 13)",
          hsl: "hsl(0deg 0% 5%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#0a0a0a",
          rgb: "rgb(10, 10, 10)",
          hsl: "hsl(0deg 0% 4%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#070707",
          rgb: "rgb(7, 7, 7)",
          hsl: "hsl(0deg 0% 3%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#030303",
          rgb: "rgb(3, 3, 3)",
          hsl: "hsl(0deg 0% 1%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
        {
          hex: "#000000",
          rgb: "rgb(0, 0, 0)",
          hsl: "hsl(0deg 0% 0%)",
          contrast_score: { light: "AAA", dark: "F" },
        },
      ],
    });
  });
  it("Generate a color Design token definition without variations", () => {
    expect(
      generateColorTokens("black", "212121", {
        alpha: false,
        tint: false,
        shade: false,
      })
    ).toEqual({
      name: "black",
      base: {
        hex: "#212121",
        rgb: "rgb(33, 33, 33)",
        hsl: "hsl(0deg 0% 13%)",
        contrast_score: { light: "AAA", dark: "F" },
      },
      alpha: [],
      tint: [],
      shade: [],
    });
  });
  it("Returns undefined if the hex code provided is invalid", () => {
    expect(
      generateColorTokens("black", "2121", {
        alpha: false,
        tint: false,
        shade: false,
      })
    ).toEqual(undefined);
  });
});
describe("generateMeasurementTokens", () => {
  it("Generate a measurement Design token definition with variations", () => {
    expect(
      generateMeasurementTokens("ms", 12, 10, 16 / 15, "measurement")
    ).toEqual({
      base: 12,
      name: "ms",
      ratio: 1.0666666666666667,
      units: 10,
      values: [
        { pt: 9.600000000000001, px: 12.8, rem: 0.8 },
        { pt: 10.24, px: 13.653333333333334, rem: 0.8533333333333334 },
        {
          pt: 10.922666666666668,
          px: 14.563555555555556,
          rem: 0.9102222222222223,
        },
        {
          pt: 11.650844444444445,
          px: 15.53445925925926,
          rem: 0.9709037037037037,
        },
        {
          pt: 12.427567407407409,
          px: 16.57008987654321,
          rem: 1.0356306172839507,
        },
        {
          pt: 13.25607190123457,
          px: 17.674762534979426,
          rem: 1.104672658436214,
        },
        {
          pt: 14.13981002798354,
          px: 18.853080037311386,
          rem: 1.1783175023319616,
        },
        {
          pt: 15.08246402984911,
          px: 20.109952039798813,
          rem: 1.2568720024874258,
        },
        {
          pt: 16.08796163183905,
          px: 21.450615509118734,
          rem: 1.3406634693199209,
        },
      ],
    });
  });
  it("Generate a fontsize Design token definition with variations", () => {
    expect(generateMeasurementTokens("fs", 12, 10, 9 / 8, "fontsize")).toEqual({
      base: 12,
      name: "fs",
      ratio: 1.125,
      units: 10,
      values: [
        { pt: 10.125, px: 13.5, rem: 0.84375 },
        { pt: 11.390625, px: 15.1875, rem: 0.94921875 },
        { pt: 12.814453125, px: 17.0859375, rem: 1.06787109375 },
        { pt: 14.416259765625, px: 19.2216796875, rem: 1.20135498046875 },
        {
          pt: 16.218292236328125,
          px: 21.6243896484375,
          rem: 1.3515243530273438,
        },
        {
          pt: 18.24557876586914,
          px: 24.327438354492188,
          rem: 1.5204648971557617,
        },
        {
          pt: 20.526276111602783,
          px: 27.36836814880371,
          rem: 1.710523009300232,
        },
        {
          pt: 23.09206062555313,
          px: 30.789414167404175,
          rem: 1.924338385462761,
        },
        {
          pt: 25.978568203747272,
          px: 34.6380909383297,
          rem: 2.164880683645606,
        },
      ],
    });
  });
});
describe("generateSequenceVariation", () => {
  it("Generate the variations values for an opacity sequence design token", () => {
    expect(
      generateSequenceVariation({
        contrast: 0.1,
      })
    ).toEqual({
      contrast_score: { dark: "F", light: "F" },
      usage: ["backdrop", "transparent"],
    });
  });
  it("Generate the variations values for a z-index sequence design token", () => {
    expect(
      generateSequenceVariation({
        sequence: generateSequences({
          base: 1,
          units: 10,
          steps: 10,
          decimal: false,
        }),
        index: 5,
      })
    ).toEqual({
      stack_order: { label: "median", score: 2 },
      usage: ["fixed", "off-canvas", "overlay"],
    });
  });
});
describe("generateSequenceTokens", () => {
  it("Generate a depth Design token definition with variations", () => {
    expect(generateSequenceTokens("depth", 1, 2, 10, false)).toEqual({
      base: 1,
      name: "depth",
      steps: 10,
      units: 2,
      values: [
        {
          stack_order: { label: "low", score: 1 },
          usage: ["base", "toolbar", "dropdown"],
          value: 1,
        },
        {
          stack_order: { label: "median", score: 2 },
          usage: ["fixed", "off-canvas", "overlay"],
          value: 11,
        },
      ],
    });
  });
  it("Generate an opacity Design token definition with variations", () => {
    expect(generateSequenceTokens("opacity", 1, 2, 10, true)).toEqual({
      base: 1,
      name: "opacity",
      steps: 10,
      units: 2,
      values: [
        {
          contrast_score: { dark: "F", light: "F" },
          usage: ["backdrop", "transparent"],
          value: 0.1,
        },
        {
          contrast_score: { dark: "F", light: "F" },
          usage: ["backdrop", "transparent"],
          value: 0.2,
        },
      ],
    });
  });
});
describe("generateTokensFromTemplate", () => {
  it("Generate a color design tokens set based on a standard payload", () => {
    expect(
      generateTokensFromTemplate({
        type: "color",
        values: [
          {
            name: "red",
            base: "cc0000",
            variations: {
              alpha: false,
              shade: false,
              tint: false,
            },
          },
        ],
      })
    ).toEqual([
      {
        alpha: [],
        base: {
          contrast_score: { dark: "F", light: "AA" },
          hex: "#cc0000",
          hsl: "hsl(0deg 100% 40%)",
          rgb: "rgb(204, 0, 0)",
        },
        name: "red",
        shade: [],
        tint: [],
      },
    ]);
  });
  it("Generate a measurement design tokens set based on a standard payload", () => {
    expect(
      generateTokensFromTemplate({
        type: "fontsize",
        values: [
          {
            name: "small",
            base: 16,
            ratio: 1.13,
            units: 10,
          },
        ],
      })
    ).toEqual([
      {
        base: 16,
        name: "small",
        ratio: 1.13,
        units: 10,
        values: [
          16, 18.08, 20.430399999999995, 23.08635199999999, 26.087577759999988,
          29.478962868799982, 33.31122804174397, 37.64168768717069,
          42.535107086502876, 48.064671007748245,
        ],
      },
    ]);
  });
  it("Generate a sequence design tokens set based on a standard payload", () => {
    expect(
      generateTokensFromTemplate({
        type: "depth",
        values: [
          {
            name: "layout",
            base: 1,
            units: 2,
            steps: 10,
          },
        ],
      })
    ).toEqual([
      {
        base: 1,
        name: "layout",
        steps: 10,
        units: 2,
        values: [
          {
            stack_order: { label: "low", score: 1 },
            usage: ["base", "toolbar", "dropdown"],
            value: 1,
          },
          {
            stack_order: { label: "median", score: 2 },
            usage: ["fixed", "off-canvas", "overlay"],
            value: 11,
          },
        ],
      },
    ]);
  });
});
describe("generateTokensLibrary", () => {
  it("Generate a design tokens library based on a standard payload", () => {
    const payload = [
      {
        type: "color",
        values: [
          {
            name: "red",
            base: "cc0000",
            variations: {
              alpha: false,
              shade: false,
              tint: false,
            },
          },
        ],
      },
      {
        type: "measurement",
        values: [
          {
            name: "small",
            base: 3,
            ratio: 1.62,
            units: 2,
          },
        ],
      },
      {
        type: "fontsize",
        values: [
          {
            name: "small",
            base: 16,
            ratio: 1.13,
            units: 2,
          },
        ],
      },
      {
        type: "depth",
        values: [
          {
            name: "layout",
            base: 1,
            units: 2,
            steps: 10,
          },
        ],
      },
      {
        type: "opacity",
        values: [
          {
            name: "action",
            base: 1,
            units: 2,
            steps: 10,
            decimal: true,
          },
        ],
      },
    ];

    expect(generateTokensLibrary("test", payload)).toEqual({
      design_tokens: {
        color: [
          {
            alpha: [],
            base: {
              contrast_score: { dark: "F", light: "AA" },
              hex: "#cc0000",
              hsl: "hsl(0deg 100% 40%)",
              rgb: "rgb(204, 0, 0)",
            },
            name: "red",
            shade: [],
            tint: [],
          },
        ],
        depth: [
          {
            base: 1,
            name: "layout",
            steps: 10,
            units: 2,
            values: [
              {
                stack_order: { label: "low", score: 1 },
                usage: ["base", "toolbar", "dropdown"],
                value: 1,
              },
              {
                stack_order: { label: "median", score: 2 },
                usage: ["fixed", "off-canvas", "overlay"],
                value: 11,
              },
            ],
          },
        ],
        fontsize: [
          {
            base: 16,
            name: "small",
            ratio: 1.13,
            units: 2,
            values: [16, 18.08],
          },
        ],
        measurement: [
          { base: 3, name: "small", ratio: 1.62, units: 2, values: [3, 4.86] },
        ],
        opacity: [
          {
            base: 1,
            name: "action",
            steps: 10,
            units: 2,
            values: [
              {
                contrast_score: { dark: "F", light: "F" },
                usage: ["backdrop", "transparent"],
                value: 0.1,
              },
              {
                contrast_score: { dark: "F", light: "F" },
                usage: ["backdrop", "transparent"],
                value: 0.2,
              },
            ],
          },
        ],
      },
      name: "test",
    });
  });
  it("Returns undefined if the token type is missing in a definition", () => {
    const payload = [
      {
        type: null,
        values: [
          {
            name: "small",
            base: 3,
            ratio: 1.62,
            units: 2,
          },
        ],
      },
    ];
    expect(generateTokensLibrary("test", payload)).toEqual({
      design_tokens: {
        color: [],
        depth: [],
        fontsize: [],
        measurement: [],
        opacity: [],
      },
      name: "test",
    });
  });
});
