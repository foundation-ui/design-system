# Advanced usage

### Overview

### Setup

### Usage

### Generators

#### MeasurementRatios

The `MeasurementRatios` constant is an array of objects that define the measurement ratios used in the `generateModularScales` function. Each object contains a `name` property, which is a string that represents the name of the ratio, and a `value` property, which is an enumeration that represents the value of the ratio. The available ratios are:

- `MinorSecond`: 16/15
- `MajorSecond`: 9/8
- `MinorThird`: 6/5
- `MajorThird`: 5/4
- `PerfectFourth`: 4/3
- `PerfectFifth`: 3/2
- `GoldenRatio`: (1 + √5) / 2

#### generateVariation

The `generateVariation` function takes a hex color value, a mode, and an optional amount as input, and returns an array of objects that contain different color formats with varying luminance values based on the provided mode. The algorithm used in this function is as follows:

```js
const generateVariation = (Hex: string, mode: TMode, amount?: number) => {
  const variationValuesArray: IColorVariation[] = [];

  while (variationValuesArray.length < (amount || 10)) {
    const variationHHEXValue = applyColorLuminance(
      Hex,
      setLuminanceTone(luminanceAmountFormatter(variationValuesArray), mode)
    );
    const variationFormats = {
      hex: variationHHEXValue,
      rgb: `${HEXToRGB(variationHHEXValue)}`,
      hsl: `${HEXToHSL(variationHHEXValue)}`,
      contrast_score: {
        light: calculateContrastScore(variationHHEXValue, "ffffff"),
        dark: calculateContrastScore(variationHHEXValue, "000000"),
      },
    };

    variationValuesArray.push(variationFormats);
  }

  return variationValuesArray;
};
```

1. Initialize an empty array to store the generated color values.
2. Loop through a specified number of times (default is 10) to generate new color values with varying luminance values.
3. For each iteration, calculate the luminance value using the `setLuminanceTone` and `luminanceAmountFormatter` functions based on the provided mode.
4. Apply the calculated luminance value to the input hex color value using the `applyColorLuminance` function.
5. Convert the resulting color value to RGB and HSL formats.
6. Calculate the contrast score for the resulting color value against both white and black backgrounds.
7. Add an object containing the original hex color value, the RGB and HSL formats with the applied luminance value, and the contrast scores against white and black backgrounds to the array of generated color values.
8. Return the array of generated color values.
