import { test, describe, expect, afterEach, vi } from "vitest";
import {
  generateSizeClasses,
  generateFontSizesClasses,
  generateOpacityClasses,
  generateLayoutClasses,
  generateDimensionClasses,
} from "../";

afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe("generateSizeClasses", () => {
  const mockSizes: { name: string; values: { px: number }[] }[] = [
    {
      name: "small",
      values: [{ px: 4 }, { px: 8 }],
    },
  ];

  test("Generates padding, margin and gap classes based on size data", () => {
    const css = generateSizeClasses(mockSizes as any);

    expect(css).toContain("padding: 4px;");
    expect(css).toContain("margin: 4px;");
    expect(css).toContain("gap: 4px;");
    expect(css).toContain("padding: 8px;");
    expect(css).toContain("margin: 8px;");
    expect(css).toContain("gap: 8px;");

    expect(css).toContain(".p-small-10 {");
    expect(css).toContain(".m-small-10 {");
    expect(css).toContain(".g-small-10 {");
    expect(css).toContain(".p-small-20 {");
    expect(css).toContain(".m-small-20 {");
    expect(css).toContain(".g-small-20 {");
  });

  test("Generates responsive padding and margin classes with directions", () => {
    const css = generateSizeClasses(mockSizes as any);

    expect(css).toContain("padding-left: 4px;");
    expect(css).toContain("padding-right: 4px;");
    expect(css).toContain("margin-top: 4px;");
    expect(css).toContain("margin-bottom: 4px;");
    expect(css).toContain("padding-left: 8px;");
    expect(css).toContain("padding-right: 8px;");
    expect(css).toContain("margin-top: 8px;");
    expect(css).toContain("margin-bottom: 8px;");

    expect(css).toContain(".p-x-small-10 {");
    expect(css).toContain(".p-y-small-10 {");
    expect(css).toContain(".p-t-small-10 {");
    expect(css).toContain(".p-r-small-10 {");
    expect(css).toContain(".p-b-small-10 {");
    expect(css).toContain(".p-l-small-10 {");
    expect(css).toContain(".m-x-small-10 {");
    expect(css).toContain(".m-y-small-10 {");
    expect(css).toContain(".m-t-small-10 {");
    expect(css).toContain(".m-r-small-10 {");
    expect(css).toContain(".m-b-small-10 {");
    expect(css).toContain(".m-l-small-10 {");

    expect(css).toContain(".p-x-small-20 {");
    expect(css).toContain(".p-y-small-20 {");
    expect(css).toContain(".p-t-small-20 {");
    expect(css).toContain(".p-r-small-20 {");
    expect(css).toContain(".p-b-small-20 {");
    expect(css).toContain(".p-l-small-20 {");
    expect(css).toContain(".m-x-small-20 {");
    expect(css).toContain(".m-y-small-20 {");
    expect(css).toContain(".m-t-small-20 {");
    expect(css).toContain(".m-r-small-20 {");
    expect(css).toContain(".m-b-small-20 {");
    expect(css).toContain(".m-l-small-20 {");
  });
});

describe("generateFontSizesClasses", () => {
  const mockFontSizes: { name: string; values: { px: number }[] }[] = [
    {
      name: "base",
      values: [{ px: 16 }, { px: 20 }],
    },
  ];

  test("Generates font size classes based on size data", () => {
    const css = generateFontSizesClasses(mockFontSizes as any);

    expect(css).toContain("font-size: 16px;");
    expect(css).toContain("font-size: 20px;");

    expect(css).toContain(".fs-base-10 {");
    expect(css).toContain(".fs-base-20 {");
  });
});

describe("generateOpacityClasses", () => {
  const mockOpacity: { name: string; values: { value: number }[] }[] = [
    {
      name: "strong",
      values: [{ value: 0.8 }, { value: 0.6 }],
    },
  ];

  test("Generates opacity classes based on opacity data", () => {
    const css = generateOpacityClasses(mockOpacity as any);

    expect(css).toContain("opacity: 0.8;");
    expect(css).toContain("opacity: 0.6;");

    expect(css).toContain(".opacity-strong-10 {");
    expect(css).toContain(".opacity-strong-20 {");
  });
});

describe("generateLayoutClasses", () => {
  test("Generates display, justify-content, align-items and flex-wrap classes", () => {
    const css = generateLayoutClasses();

    expect(css).toContain("display: flex;");
    expect(css).toContain("display: grid;");
    expect(css).toContain("justify-content: flex-start;");
    expect(css).toContain("align-items: flex-start;");

    expect(css).toContain(".flex {");
    expect(css).toContain(".grid {");
    expect(css).toContain(".justify-start {");
    expect(css).toContain(".align-start {");

    expect(css).toContain("justify-content: flex-end;");
    expect(css).toContain("justify-content: center;");
    expect(css).toContain("justify-content: space-between;");
    expect(css).toContain("justify-content: space-around;");
    expect(css).toContain("justify-content: space-evenly;");
    expect(css).toContain("justify-content: stretch;");
    expect(css).toContain("justify-content: start;");
    expect(css).toContain("justify-content: end;");
    expect(css).toContain("justify-content: left;");
    expect(css).toContain("justify-content: right;");
    expect(css).toContain("justify-content: baseline;");
    expect(css).toContain("justify-content: revert;");

    expect(css).toContain("align-items: flex-end;");
    expect(css).toContain("align-items: center;");
    expect(css).toContain("align-items: space-between;");
    expect(css).toContain("align-items: space-around;");
    expect(css).toContain("align-items: space-evenly;");
    expect(css).toContain("align-items: stretch;");
    expect(css).toContain("align-items: start;");
    expect(css).toContain("align-items: end;");
    expect(css).toContain("align-items: left;");
    expect(css).toContain("align-items: right;");
    expect(css).toContain("align-items: baseline;");
    expect(css).toContain("align-items: revert;");

    expect(css).toContain(".justify-end {");
    expect(css).toContain(".justify-center {");
    expect(css).toContain(".justify-stretch {");
    expect(css).toContain(".justify-start {");
    expect(css).toContain(".justify-end {");
    expect(css).toContain(".justify-left {");
    expect(css).toContain(".justify-right {");
    expect(css).toContain(".justify-baseline {");
    expect(css).toContain(".justify-revert {");

    expect(css).toContain(".align-end {");
    expect(css).toContain(".align-center {");
    expect(css).toContain(".align-stretch {");
    expect(css).toContain(".align-start {");
    expect(css).toContain(".align-end {");
    expect(css).toContain(".align-left {");
    expect(css).toContain(".align-right {");
    expect(css).toContain(".align-baseline {");
    expect(css).toContain(".align-revert {");

    expect(css).toContain("flex-wrap: wrap;");
    expect(css).toContain("flex-wrap: wrap-reverse;");
    expect(css).toContain("flex-wrap: nowrap;");
    expect(css).toContain("flex-wrap: revert;");
    expect(css).toContain("flex-wrap: revert-layer;");
    expect(css).toContain("flex-wrap: unset;");
    expect(css).toContain("flex-wrap: inherit;");
    expect(css).toContain("flex-wrap: initial;");
  });
});

describe("generateDimensionClasses", () => {
  test("Generate width and height classes based on predefined options", () => {
    const css = generateDimensionClasses();

    expect(css).toContain("width: 100%;");
    expect(css).toContain("height: 100%;");
    expect(css).toContain("width: auto;");
    expect(css).toContain("height: auto;");

    expect(css).toContain(".w-100 {");
    expect(css).toContain(".h-100 {");
    expect(css).toContain(".w-auto {");
    expect(css).toContain(".h-auto {");

    expect(css).toContain("width: 95%;");
    expect(css).toContain("width: 90%;");
    expect(css).toContain("width: 85%;");
    expect(css).toContain("width: 80%;");
    expect(css).toContain("width: 75%;");
    expect(css).toContain("width: 70%;");
    expect(css).toContain("width: 66%;");
    expect(css).toContain("width: 50%;");
    expect(css).toContain("width: 33%;");
    expect(css).toContain("width: 25%;");
    expect(css).toContain("width: 10%;");
    expect(css).toContain("width: fit-content;");
    expect(css).toContain("width: max-content;");

    expect(css).toContain("height: 95%;");
    expect(css).toContain("height: 90%;");
    expect(css).toContain("height: 85%;");
    expect(css).toContain("height: 80%;");
    expect(css).toContain("height: 75%;");
    expect(css).toContain("height: 70%;");
    expect(css).toContain("height: 66%;");
    expect(css).toContain("height: 50%;");
    expect(css).toContain("height: 33%;");
    expect(css).toContain("height: 25%;");
    expect(css).toContain("height: 10%;");
    expect(css).toContain("height: fit-content;");
    expect(css).toContain("height: max-content;");

    expect(css).toContain(".w-95 {");
    expect(css).toContain(".w-90 {");
    expect(css).toContain(".w-85 {");
    expect(css).toContain(".w-80 {");
    expect(css).toContain(".w-75 {");
    expect(css).toContain(".w-70 {");
    expect(css).toContain(".w-66 {");
    expect(css).toContain(".w-50 {");
    expect(css).toContain(".w-33 {");
    expect(css).toContain(".w-25 {");
    expect(css).toContain(".w-10 {");

    expect(css).toContain(".h-95 {");
    expect(css).toContain(".h-90 {");
    expect(css).toContain(".h-85 {");
    expect(css).toContain(".h-80 {");
    expect(css).toContain(".h-75 {");
    expect(css).toContain(".h-70 {");
    expect(css).toContain(".h-66 {");
    expect(css).toContain(".h-50 {");
    expect(css).toContain(".h-33 {");
    expect(css).toContain(".h-25 {");
    expect(css).toContain(".h-10 {");
  });
});
