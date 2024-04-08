# Generators

Foundation Design System comes with a set of methods located in the `@foundation-ui/core` package. These methods are built to generate a stuctured Design Tokens based on a few parameters. Each design token come with a key-value and a set of annotations that you can use in your application.

Foundation Design System provides a set of ratio to generate your Measurement Design Tokens. It is based on this [documentation](https://www.modularscale.com/) from [Scott Kellum](https://scottkellum.com/) and [Tim Brown](https://twitter.com/nicewebtype).
Here is the set of ratio, you can import it using `import { RatioEnum } from "@foundation-ui/design-system"` in your code.

```ts
enum RatioEnum {
  MinorSecond = 16 / 15,
  MajorSecond = 9 / 8,
  MinorThird = 6 / 5,
  MajorThird = 5 / 4,
  PerfectFourth = 4 / 3,
  PerfectFifth = 3 / 2,
  GoldenRatio = 1.618 / 1,
}
```

> You will also be able to import and use every functions used by the following generators. **_These functions are not documented yet, if you are planning to use it, make sure to visit the [playground page](?path=/story/playground-app--app) to see how they work._**

---

### Design Tokens Library

The `generateTokensLibrary` function enables you to generate a Design Tokens Library by providing an array of objects describing the properties of your tokens.

#### Usage

To use the `generateTokensLibrary` function, define the `name` and `payload` arguments.
The `payload` argument must be structured as described by this type definition:

```ts
interface ITemplatePayload {
  type: string;
  values: ITemplateValues[];
}
interface ITemplateValues {
  name?: string;
  base?: string | number;
  ratio?: number;
  units?: number;
  steps?: number;
  decimal?: boolean;
  variations?: {
    alpha?: boolean;
    shade?: boolean;
    tint?: boolean;
  };
}
```

Here is an integration sample:

```ts
import { generateTokensLibrary } from "@foundation-ui/design-system";

const design_tokens_library = generateTokensLibrary(
  "custom-design-tokens-library",
  [
    {
      type: "color",
      values: [
        {
          name: "dark",
          base: "111111",
          variations: {
            alpha: true,
            shade: false,
            tint: false,
          },
        },
        {
          name: "light",
          base: "fafafa",
          variations: {
            alpha: true,
            shade: false,
            tint: false,
          },
        },
      ],
    },
  ]
);
```

### Design Tokens Set

The `generateTokensFromTemplate` function enables you to generate a Design Tokens Set by providing an object describing the properties of your token.

#### Usage

To use the `generateTokensFromTemplate` function, define the `payload` argument.
The `payload` argument must be structured as described by this type definition:

```ts
interface ITemplatePayload {
  type: string;
  values: ITemplateValues[];
}
interface ITemplateValues {
  name?: string;
  base?: string | number;
  ratio?: number;
  units?: number;
  steps?: number;
  decimal?: boolean;
  variations?: {
    alpha?: boolean;
    shade?: boolean;
    tint?: boolean;
  };
}
```

Here is an integration sample:

```ts
import { generateTokensFromTemplate } from "@foundation-ui/design-system";

const design_tokens_set = generateTokensFromTemplate({
  type: "measurement",
  values: [
    {
      name: "small",
      base: 3,
      ratio: 1.62,
      units: 10,
    },
  ],
});
```

### Colors Tokens

The `generateColorTokens` function enables you to generate a Color Design Tokens Set with a few parameters to controls the generated variations.

#### Usage

To use the `generateColorTokens` function, define the `name`, `hex` and `variations` arguments.
The `variations` argument must be structured as described by this type definition:

```ts
interface IColorVariationsParams {
  alpha?: boolean;
  tint?: boolean;
  shade?: boolean;
}
```

Here is an integration sample:

```ts
import { generateColorTokens } from "@foundation-ui/design-system";

const color_design_tokens_set = generateColorTokens("red", "FF0000", {
  alpha: true,
  tint: true,
  shade: true,
});
```

### Measurement Tokens

The `generateMeasurementTokens` function enables you to generate a Measurement or Font Size Design Tokens Set with a few parameters to controls the generated sequence.

#### Usage

To use the `generateMeasurementTokens` function, define the `name`, `base`, `units`, `ratio` and `variant` arguments.

The arguments must be structured as described by this type definition:

```ts
interface IMeasurementParams {
  name: string;
  base: number;
  units: number;
  ratio: number;
  variant: "measurement" | "fontsize";
}
```

Here is an integration sample:

```ts
import { generateColorTokens } from "@foundation-ui/design-system";

const spacing_design_tokens_set = generateMeasurementTokens(
  "spacing-base", // name
  12, // base
  10, // units
  1.25, // ratio
  "measurement" // variant
);
```

### Sequence Tokens

The `generateSequenceTokens` function enables you to generate an Opacity or Depth Design Tokens Set with a few parameters to controls the generated sequence.

#### Usage

To use the `generateSequenceTokens` function, define the `name`, `base`, `units`, `steps` and `decimal` arguments.
The arguments must be structured as described by this type definition:

```ts
interface ISequenceParams {
  name: string;
  base: number;
  units: number;
  steps: number;
  decimal: boolean;
}
```

Here is an integration sample:

```ts
import { generateSequenceTokens } from "@foundation-ui/design-system";

const depth_design_tokens_set = generateSequenceTokens(
  "depth-base", // name
  1, // base
  10, // units
  10, // steps
  false // decimal
);
const opacity_design_tokens_set = generateSequenceTokens(
  "opacity-base",
  1,
  10,
  10,
  true
);
```
