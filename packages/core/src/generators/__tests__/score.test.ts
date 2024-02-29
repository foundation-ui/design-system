import {
  getContrastRatio,
  calculateContrastScore,
  calculateStackOrder,
  getSequenceUsages,
} from "../score";

describe("getContrastRatio", () => {
  it("Returns the contrast ratio of a color based on its value of the background value", () => {
    expect(getContrastRatio([255, 255, 255], [0, 0, 0])).toEqual(21);
    expect(getContrastRatio([255, 255, 255], [255, 255, 255])).toEqual(1);
    expect(getContrastRatio([0, 0, 0], [255, 255, 255])).toEqual(21);
  });
});
describe("calculateContrastScore", () => {
  it("Return the contrast score as a notation going from F(low) to AAA(high)", () => {
    expect(calculateContrastScore("FFFFFF", "000000")).toEqual("AAA");
    expect(calculateContrastScore("FF0000", "000000")).toEqual("AA");
    expect(calculateContrastScore("212121", "000000")).toEqual("F");
  });
});
describe("calculateStackOrder", () => {
  it("Returns the hierarchy of a Design Token based on its context", () => {
    expect(calculateStackOrder(2, Array.from(Array(10).keys()))).toEqual({
      label: "low",
      score: 1,
    });
    expect(calculateStackOrder(4.5, Array.from(Array(10).keys()))).toEqual({
      label: "low",
      score: 1,
    });
    expect(calculateStackOrder(5, Array.from(Array(10).keys()))).toEqual({
      label: "median",
      score: 2,
    });
    expect(calculateStackOrder(5.5, Array.from(Array(10).keys()))).toEqual({
      label: "high",
      score: 3,
    });
    expect(calculateStackOrder(10, Array.from(Array(10).keys()))).toEqual({
      label: "high",
      score: 3,
    });
  });
});
describe("getSequenceUsages", () => {
  it("Returns the prefered usage of a Design Token based on its context", () => {
    // Depth
    expect(
      getSequenceUsages(null, {
        label: "low",
        score: 1,
      })
    ).toEqual(["base", "toolbar", "dropdown"]);
    expect(
      getSequenceUsages(null, {
        label: "median",
        score: 2,
      })
    ).toEqual(["fixed", "off-canvas", "overlay"]);
    expect(
      getSequenceUsages(null, {
        label: "high",
        score: 3,
      })
    ).toEqual(["notification", "above-content"]);

    // Opacity
    expect(getSequenceUsages("F")).toEqual(["backdrop", "transparent"]);
    expect(getSequenceUsages("AA")).toEqual(["icons", "animations", "layout"]);
    expect(getSequenceUsages("AAA")).toEqual(["icons", "animations", "layout"]);
  });
});
