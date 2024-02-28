import { generateModularScales, generateSequences } from "../modular-sequence";

describe("generateModularScales", () => {
  it("Should return an array of numbers with the expected length and values", () => {
    const scales = generateModularScales({
      base: 16,
      ratio: [3 / 2],
      units: 8,
    });
    const scalesAsValues = generateModularScales({
      base: 16,
      ratio: [3 / 2],
      units: 8,
      convert: true,
    });

    expect(Array.isArray(scales)).toBe(true);
    expect(scales.length).toEqual(8);

    expect(scales).toEqual([16, 24, 36, 54, 81, 121.5, 182.25, 273.375]);
    expect(scalesAsValues).toEqual([
      {
        pt: 18,
        px: 24,
        rem: 1.5,
      },
      {
        pt: 27,
        px: 36,
        rem: 2.25,
      },
      {
        pt: 40.5,
        px: 54,
        rem: 3.375,
      },
      {
        pt: 60.75,
        px: 81,
        rem: 5.0625,
      },
      {
        pt: 91.125,
        px: 121.5,
        rem: 7.59375,
      },
      {
        pt: 136.6875,
        px: 182.25,
        rem: 11.390625,
      },
      {
        pt: 205.03125,
        px: 273.375,
        rem: 17.0859375,
      },
    ]);
  });
});
describe("generateSequences", () => {
  it("Should return an array of numbers with the expected length and values", () => {
    const baseParams = {
      base: 1,
      units: 10,
      steps: 10,
    };
    const sequence = generateSequences({
      ...baseParams,
      decimal: false,
    });
    const sequenceDecimal = generateSequences({
      ...baseParams,
      decimal: true,
    });

    expect(Array.isArray(sequence)).toBe(true);
    expect(sequence.length).toEqual(10);
    expect(sequence).toEqual([1, 11, 21, 31, 41, 51, 61, 71, 81, 91]);
    expect(sequenceDecimal).toEqual([
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
    ]);
  });
});
