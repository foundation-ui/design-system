# Assets

The assets provided by Foundation Design System are generated using the function described in the [Generators documentation](?path=/docs/generators--documentation). Those are the Design Tokens used by `@foundation/components` when the components are used with the `raw` property set to `false`.

#### Color Design Tokens

##### Light

```tsx
import { colors_light_design_tokens } from '@foundation/design-system': //'@foundation/tokens'
```

<details>
  <summary><small>Design tokens</small></summary>

```json
[
  {
    "name": "mono-light",
    "base": {
      "hex": "#fafafa",
      "rgb": "rgb(250, 250, 250)",
      "hsl": "rgb(250, 250, 250)",
      "contrast_score": { "light": "F", "dark": "AAA" }
    },
    "alpha": [
      {
        "hex": "#fafafa10",
        "rgb": "rgba(250, 250, 250, 0.1)",
        "hsl": "hsl(0deg 0% 98% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#fafafa20",
        "rgb": "rgba(250, 250, 250, 0.2)",
        "hsl": "hsl(0deg 0% 98% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#fafafa30",
        "rgb": "rgba(250, 250, 250, 0.3)",
        "hsl": "hsl(0deg 0% 98% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#fafafa40",
        "rgb": "rgba(250, 250, 250, 0.4)",
        "hsl": "hsl(0deg 0% 98% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#fafafa50",
        "rgb": "rgba(250, 250, 250, 0.5)",
        "hsl": "hsl(0deg 0% 98% / 50%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#fafafa60",
        "rgb": "rgba(250, 250, 250, 0.6)",
        "hsl": "hsl(0deg 0% 98% / 60%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#fafafa70",
        "rgb": "rgba(250, 250, 250, 0.7)",
        "hsl": "hsl(0deg 0% 98% / 70%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#fafafa80",
        "rgb": "rgba(250, 250, 250, 0.8)",
        "hsl": "hsl(0deg 0% 98% / 80%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#fafafa90",
        "rgb": "rgba(250, 250, 250, 0.9)",
        "hsl": "hsl(0deg 0% 98% / 90%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#fafafa",
        "rgb": "rgba(250, 250, 250, 1)",
        "hsl": "hsl(0deg 0% 98% / 100%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "tint": [],
    "shade": []
  },
  {
    "name": "mono-white",
    "base": {
      "hex": "#f1f1f1",
      "rgb": "rgb(241, 241, 241)",
      "hsl": "rgb(241, 241, 241)",
      "contrast_score": { "light": "F", "dark": "AAA" }
    },
    "alpha": [
      {
        "hex": "#f1f1f110",
        "rgb": "rgba(241, 241, 241, 0.1)",
        "hsl": "hsl(0deg 0% 95% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#f1f1f120",
        "rgb": "rgba(241, 241, 241, 0.2)",
        "hsl": "hsl(0deg 0% 95% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#f1f1f130",
        "rgb": "rgba(241, 241, 241, 0.3)",
        "hsl": "hsl(0deg 0% 95% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#f1f1f140",
        "rgb": "rgba(241, 241, 241, 0.4)",
        "hsl": "hsl(0deg 0% 95% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#f1f1f150",
        "rgb": "rgba(241, 241, 241, 0.5)",
        "hsl": "hsl(0deg 0% 95% / 50%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#f1f1f160",
        "rgb": "rgba(241, 241, 241, 0.6)",
        "hsl": "hsl(0deg 0% 95% / 60%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#f1f1f170",
        "rgb": "rgba(241, 241, 241, 0.7)",
        "hsl": "hsl(0deg 0% 95% / 70%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#f1f1f180",
        "rgb": "rgba(241, 241, 241, 0.8)",
        "hsl": "hsl(0deg 0% 95% / 80%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#f1f1f190",
        "rgb": "rgba(241, 241, 241, 0.9)",
        "hsl": "hsl(0deg 0% 95% / 90%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#f1f1f1",
        "rgb": "rgba(241, 241, 241, 1)",
        "hsl": "hsl(0deg 0% 95% / 100%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "tint": [],
    "shade": []
  },
  {
    "name": "mono-whitest",
    "base": {
      "hex": "#ffffff",
      "rgb": "rgb(255, 255, 255)",
      "hsl": "rgb(255, 255, 255)",
      "contrast_score": { "light": "F", "dark": "AAA" }
    },
    "alpha": [],
    "tint": [],
    "shade": []
  }
]
```

</details>

##### Dark

```tsx
import { colors_dark_design_tokens } from '@foundation/design-system': //'@foundation/tokens'
```

<details>
  <summary><small>Design tokens</small></summary>

```json
[
  {
    "name": "mono-dark",
    "base": {
      "hex": "#212121",
      "rgb": "rgb(33, 33, 33)",
      "hsl": "rgb(33, 33, 33)",
      "contrast_score": { "light": "AAA", "dark": "F" }
    },
    "alpha": [
      {
        "hex": "#21212110",
        "rgb": "rgba(33, 33, 33, 0.1)",
        "hsl": "hsl(0deg 0% 13% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#21212120",
        "rgb": "rgba(33, 33, 33, 0.2)",
        "hsl": "hsl(0deg 0% 13% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#21212130",
        "rgb": "rgba(33, 33, 33, 0.3)",
        "hsl": "hsl(0deg 0% 13% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#21212140",
        "rgb": "rgba(33, 33, 33, 0.4)",
        "hsl": "hsl(0deg 0% 13% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#21212150",
        "rgb": "rgba(33, 33, 33, 0.5)",
        "hsl": "hsl(0deg 0% 13% / 50%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#21212160",
        "rgb": "rgba(33, 33, 33, 0.6)",
        "hsl": "hsl(0deg 0% 13% / 60%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#21212170",
        "rgb": "rgba(33, 33, 33, 0.7)",
        "hsl": "hsl(0deg 0% 13% / 70%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#21212180",
        "rgb": "rgba(33, 33, 33, 0.8)",
        "hsl": "hsl(0deg 0% 13% / 80%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#21212190",
        "rgb": "rgba(33, 33, 33, 0.9)",
        "hsl": "hsl(0deg 0% 13% / 90%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#212121",
        "rgb": "rgba(33, 33, 33, 1)",
        "hsl": "hsl(0deg 0% 13% / 100%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      }
    ],
    "tint": [],
    "shade": []
  },
  {
    "name": "mono-darker",
    "base": {
      "hex": "#111111",
      "rgb": "rgb(17, 17, 17)",
      "hsl": "rgb(17, 17, 17)",
      "contrast_score": { "light": "AAA", "dark": "F" }
    },
    "alpha": [
      {
        "hex": "#11111110",
        "rgb": "rgba(17, 17, 17, 0.1)",
        "hsl": "hsl(0deg 0% 7% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#11111120",
        "rgb": "rgba(17, 17, 17, 0.2)",
        "hsl": "hsl(0deg 0% 7% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#11111130",
        "rgb": "rgba(17, 17, 17, 0.3)",
        "hsl": "hsl(0deg 0% 7% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#11111140",
        "rgb": "rgba(17, 17, 17, 0.4)",
        "hsl": "hsl(0deg 0% 7% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#11111150",
        "rgb": "rgba(17, 17, 17, 0.5)",
        "hsl": "hsl(0deg 0% 7% / 50%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#11111160",
        "rgb": "rgba(17, 17, 17, 0.6)",
        "hsl": "hsl(0deg 0% 7% / 60%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#11111170",
        "rgb": "rgba(17, 17, 17, 0.7)",
        "hsl": "hsl(0deg 0% 7% / 70%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#11111180",
        "rgb": "rgba(17, 17, 17, 0.8)",
        "hsl": "hsl(0deg 0% 7% / 80%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#11111190",
        "rgb": "rgba(17, 17, 17, 0.9)",
        "hsl": "hsl(0deg 0% 7% / 90%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#111111",
        "rgb": "rgba(17, 17, 17, 1)",
        "hsl": "hsl(0deg 0% 7% / 100%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      }
    ],
    "tint": [],
    "shade": []
  },
  {
    "name": "mono-darkest",
    "base": {
      "hex": "#0e0e0e",
      "rgb": "rgb(14, 14, 14)",
      "hsl": "rgb(14, 14, 14)",
      "contrast_score": { "light": "AAA", "dark": "F" }
    },
    "alpha": [
      {
        "hex": "#0e0e0e10",
        "rgb": "rgba(14, 14, 14, 0.1)",
        "hsl": "hsl(0deg 0% 5% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#0e0e0e20",
        "rgb": "rgba(14, 14, 14, 0.2)",
        "hsl": "hsl(0deg 0% 5% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#0e0e0e30",
        "rgb": "rgba(14, 14, 14, 0.3)",
        "hsl": "hsl(0deg 0% 5% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#0e0e0e40",
        "rgb": "rgba(14, 14, 14, 0.4)",
        "hsl": "hsl(0deg 0% 5% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#0e0e0e50",
        "rgb": "rgba(14, 14, 14, 0.5)",
        "hsl": "hsl(0deg 0% 5% / 50%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#0e0e0e60",
        "rgb": "rgba(14, 14, 14, 0.6)",
        "hsl": "hsl(0deg 0% 5% / 60%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#0e0e0e70",
        "rgb": "rgba(14, 14, 14, 0.7)",
        "hsl": "hsl(0deg 0% 5% / 70%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#0e0e0e80",
        "rgb": "rgba(14, 14, 14, 0.8)",
        "hsl": "hsl(0deg 0% 5% / 80%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#0e0e0e90",
        "rgb": "rgba(14, 14, 14, 0.9)",
        "hsl": "hsl(0deg 0% 5% / 90%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#0e0e0e",
        "rgb": "rgba(14, 14, 14, 1)",
        "hsl": "hsl(0deg 0% 5% / 100%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      }
    ],
    "tint": [],
    "shade": []
  }
]
```

</details>

##### System

```tsx
import { colors_system_design_tokens } from '@foundation/design-system': //'@foundation/tokens'
```

<details>
  <summary><small>Design tokens</small></summary>

```json
[
  {
    "name": "yellow",
    "base": {
      "hex": "#ffd233",
      "rgb": "rgb(255, 210, 51)",
      "hsl": "rgb(255, 210, 51)",
      "contrast_score": { "light": "F", "dark": "AAA" }
    },
    "alpha": [
      {
        "hex": "#ffd23310",
        "rgb": "rgba(255, 210, 51, 0.1)",
        "hsl": "hsl(47deg 100% 60% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#ffd23320",
        "rgb": "rgba(255, 210, 51, 0.2)",
        "hsl": "hsl(47deg 100% 60% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#ffd23330",
        "rgb": "rgba(255, 210, 51, 0.3)",
        "hsl": "hsl(47deg 100% 60% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#ffd23340",
        "rgb": "rgba(255, 210, 51, 0.4)",
        "hsl": "hsl(47deg 100% 60% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#ffd23350",
        "rgb": "rgba(255, 210, 51, 0.5)",
        "hsl": "hsl(47deg 100% 60% / 50%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#ffd23360",
        "rgb": "rgba(255, 210, 51, 0.6)",
        "hsl": "hsl(47deg 100% 60% / 60%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#ffd23370",
        "rgb": "rgba(255, 210, 51, 0.7)",
        "hsl": "hsl(47deg 100% 60% / 70%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffd23380",
        "rgb": "rgba(255, 210, 51, 0.8)",
        "hsl": "hsl(47deg 100% 60% / 80%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffd23390",
        "rgb": "rgba(255, 210, 51, 0.9)",
        "hsl": "hsl(47deg 100% 60% / 90%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffd233",
        "rgb": "rgba(255, 210, 51, 1)",
        "hsl": "hsl(47deg 100% 60% / 100%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "tint": [
      {
        "hex": "#ffe738",
        "rgb": "rgb(255, 231, 56)",
        "hsl": "hsl(53deg 100% 61%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#fffc3d",
        "rgb": "rgb(255, 252, 61)",
        "hsl": "hsl(59deg 100% 62%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffff42",
        "rgb": "rgb(255, 255, 66)",
        "hsl": "hsl(60deg 100% 63%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffff47",
        "rgb": "rgb(255, 255, 71)",
        "hsl": "hsl(60deg 100% 64%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffff4d",
        "rgb": "rgb(255, 255, 77)",
        "hsl": "hsl(60deg 100% 65%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffff52",
        "rgb": "rgb(255, 255, 82)",
        "hsl": "hsl(60deg 100% 66%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffff57",
        "rgb": "rgb(255, 255, 87)",
        "hsl": "hsl(60deg 100% 67%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffff5c",
        "rgb": "rgb(255, 255, 92)",
        "hsl": "hsl(60deg 100% 68%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffff61",
        "rgb": "rgb(255, 255, 97)",
        "hsl": "hsl(60deg 100% 69%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffff66",
        "rgb": "rgb(255, 255, 102)",
        "hsl": "hsl(60deg 100% 70%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "shade": [
      {
        "hex": "#e6bd2e",
        "rgb": "rgb(230, 189, 46)",
        "hsl": "hsl(47deg 79% 54%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#cca829",
        "rgb": "rgb(204, 168, 41)",
        "hsl": "hsl(47deg 67% 48%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#b39324",
        "rgb": "rgb(179, 147, 36)",
        "hsl": "hsl(47deg 67% 42%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#997e1f",
        "rgb": "rgb(153, 126, 31)",
        "hsl": "hsl(47deg 66% 36%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#80691a",
        "rgb": "rgb(128, 105, 26)",
        "hsl": "hsl(46deg 66% 30%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#665414",
        "rgb": "rgb(102, 84, 20)",
        "hsl": "hsl(47deg 67% 24%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#4d3f0f",
        "rgb": "rgb(77, 63, 15)",
        "hsl": "hsl(46deg 67% 18%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#332a0a",
        "rgb": "rgb(51, 42, 10)",
        "hsl": "hsl(47deg 67% 12%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#1a1505",
        "rgb": "rgb(26, 21, 5)",
        "hsl": "hsl(46deg 68% 6%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#000000",
        "rgb": "rgb(0, 0, 0)",
        "hsl": "hsl(0deg 0% 0%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      }
    ]
  },
  {
    "name": "blue",
    "base": {
      "hex": "#5e6eff",
      "rgb": "rgb(94, 110, 255)",
      "hsl": "rgb(94, 110, 255)",
      "contrast_score": { "light": "F", "dark": "AA" }
    },
    "alpha": [
      {
        "hex": "#5e6eff10",
        "rgb": "rgba(94, 110, 255, 0.1)",
        "hsl": "hsl(234deg 100% 68% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#5e6eff20",
        "rgb": "rgba(94, 110, 255, 0.2)",
        "hsl": "hsl(234deg 100% 68% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#5e6eff30",
        "rgb": "rgba(94, 110, 255, 0.3)",
        "hsl": "hsl(234deg 100% 68% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#5e6eff40",
        "rgb": "rgba(94, 110, 255, 0.4)",
        "hsl": "hsl(234deg 100% 68% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#5e6eff50",
        "rgb": "rgba(94, 110, 255, 0.5)",
        "hsl": "hsl(234deg 100% 68% / 50%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#5e6eff60",
        "rgb": "rgba(94, 110, 255, 0.6)",
        "hsl": "hsl(234deg 100% 68% / 60%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#5e6eff70",
        "rgb": "rgba(94, 110, 255, 0.7)",
        "hsl": "hsl(234deg 100% 68% / 70%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#5e6eff80",
        "rgb": "rgba(94, 110, 255, 0.8)",
        "hsl": "hsl(234deg 100% 68% / 80%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#5e6eff90",
        "rgb": "rgba(94, 110, 255, 0.9)",
        "hsl": "hsl(234deg 100% 68% / 90%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#5e6eff",
        "rgb": "rgba(94, 110, 255, 1)",
        "hsl": "hsl(234deg 100% 68% / 100%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      }
    ],
    "tint": [
      {
        "hex": "#6779ff",
        "rgb": "rgb(103, 121, 255)",
        "hsl": "hsl(233deg 100% 70%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#7184ff",
        "rgb": "rgb(113, 132, 255)",
        "hsl": "hsl(232deg 100% 72%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#7a8fff",
        "rgb": "rgb(122, 143, 255)",
        "hsl": "hsl(231deg 100% 74%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#849aff",
        "rgb": "rgb(132, 154, 255)",
        "hsl": "hsl(229deg 100% 76%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#8da5ff",
        "rgb": "rgb(141, 165, 255)",
        "hsl": "hsl(227deg 100% 78%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#96b0ff",
        "rgb": "rgb(150, 176, 255)",
        "hsl": "hsl(225deg 100% 79%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#a0bbff",
        "rgb": "rgb(160, 187, 255)",
        "hsl": "hsl(223deg 100% 81%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#a9c6ff",
        "rgb": "rgb(169, 198, 255)",
        "hsl": "hsl(220deg 100% 83%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#b3d1ff",
        "rgb": "rgb(179, 209, 255)",
        "hsl": "hsl(216deg 100% 85%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#bcdcff",
        "rgb": "rgb(188, 220, 255)",
        "hsl": "hsl(211deg 100% 87%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "shade": [
      {
        "hex": "#5563e6",
        "rgb": "rgb(85, 99, 230)",
        "hsl": "hsl(234deg 74% 62%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#4b58cc",
        "rgb": "rgb(75, 88, 204)",
        "hsl": "hsl(234deg 56% 55%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#424db3",
        "rgb": "rgb(66, 77, 179)",
        "hsl": "hsl(234deg 46% 48%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#384299",
        "rgb": "rgb(56, 66, 153)",
        "hsl": "hsl(234deg 46% 41%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#2f3780",
        "rgb": "rgb(47, 55, 128)",
        "hsl": "hsl(234deg 46% 34%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#262c66",
        "rgb": "rgb(38, 44, 102)",
        "hsl": "hsl(234deg 46% 27%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#1c214d",
        "rgb": "rgb(28, 33, 77)",
        "hsl": "hsl(234deg 47% 21%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#131633",
        "rgb": "rgb(19, 22, 51)",
        "hsl": "hsl(234deg 46% 14%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#090b1a",
        "rgb": "rgb(9, 11, 26)",
        "hsl": "hsl(233deg 49% 7%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#000000",
        "rgb": "rgb(0, 0, 0)",
        "hsl": "hsl(0deg 0% 0%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      }
    ]
  },
  {
    "name": "red",
    "base": {
      "hex": "#EC4E20",
      "rgb": "rgb(236, 78, 32)",
      "hsl": "hsl(14deg 84% 53%)",
      "contrast_score": { "light": "F", "dark": "AA" }
    },
    "alpha": [
      {
        "hex": "#EC4E2010",
        "rgb": "rgba(236, 78, 32, 0.1)",
        "hsl": "hsl(14deg 84% 53% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#EC4E2020",
        "rgb": "rgba(236, 78, 32, 0.2)",
        "hsl": "hsl(14deg 84% 53% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#EC4E2030",
        "rgb": "rgba(236, 78, 32, 0.3)",
        "hsl": "hsl(14deg 84% 53% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#EC4E2040",
        "rgb": "rgba(236, 78, 32, 0.4)",
        "hsl": "hsl(14deg 84% 53% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#EC4E2050",
        "rgb": "rgba(236, 78, 32, 0.5)",
        "hsl": "hsl(14deg 84% 53% / 50%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#EC4E2060",
        "rgb": "rgba(236, 78, 32, 0.6)",
        "hsl": "hsl(14deg 84% 53% / 60%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#EC4E2070",
        "rgb": "rgba(236, 78, 32, 0.7)",
        "hsl": "hsl(14deg 84% 53% / 70%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#EC4E2080",
        "rgb": "rgba(236, 78, 32, 0.8)",
        "hsl": "hsl(14deg 84% 53% / 80%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#EC4E2090",
        "rgb": "rgba(236, 78, 32, 0.9)",
        "hsl": "hsl(14deg 84% 53% / 90%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#EC4E20",
        "rgb": "rgba(236, 78, 32, 1)",
        "hsl": "hsl(14deg 84% 53% / 100%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      }
    ],
    "tint": [
      {
        "hex": "#ff5623",
        "rgb": "rgb(255, 86, 35)",
        "hsl": "hsl(14deg 100% 57%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#ff5e26",
        "rgb": "rgb(255, 94, 38)",
        "hsl": "hsl(15deg 100% 57%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#ff652a",
        "rgb": "rgb(255, 101, 42)",
        "hsl": "hsl(17deg 100% 58%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff6d2d",
        "rgb": "rgb(255, 109, 45)",
        "hsl": "hsl(18deg 100% 59%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff7530",
        "rgb": "rgb(255, 117, 48)",
        "hsl": "hsl(20deg 100% 59%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff7d33",
        "rgb": "rgb(255, 125, 51)",
        "hsl": "hsl(22deg 100% 60%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff8536",
        "rgb": "rgb(255, 133, 54)",
        "hsl": "hsl(24deg 100% 61%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff8c3a",
        "rgb": "rgb(255, 140, 58)",
        "hsl": "hsl(25deg 100% 61%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff943d",
        "rgb": "rgb(255, 148, 61)",
        "hsl": "hsl(27deg 100% 62%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff9c40",
        "rgb": "rgb(255, 156, 64)",
        "hsl": "hsl(29deg 100% 63%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "shade": [
      {
        "hex": "#d4461d",
        "rgb": "rgb(212, 70, 29)",
        "hsl": "hsl(13deg 76% 47%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#bd3e1a",
        "rgb": "rgb(189, 62, 26)",
        "hsl": "hsl(13deg 76% 42%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#a53716",
        "rgb": "rgb(165, 55, 22)",
        "hsl": "hsl(14deg 76% 37%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#8e2f13",
        "rgb": "rgb(142, 47, 19)",
        "hsl": "hsl(14deg 76% 32%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#762710",
        "rgb": "rgb(118, 39, 16)",
        "hsl": "hsl(14deg 76% 26%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#5e1f0d",
        "rgb": "rgb(94, 31, 13)",
        "hsl": "hsl(13deg 76% 21%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#47170a",
        "rgb": "rgb(71, 23, 10)",
        "hsl": "hsl(13deg 75% 16%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#2f1006",
        "rgb": "rgb(47, 16, 6)",
        "hsl": "hsl(15deg 77% 10%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#180803",
        "rgb": "rgb(24, 8, 3)",
        "hsl": "hsl(14deg 78% 5%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#000000",
        "rgb": "rgb(0, 0, 0)",
        "hsl": "hsl(0deg 0% 0%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      }
    ]
  },
  {
    "name": "orange",
    "base": {
      "hex": "#FF7F11",
      "rgb": "rgb(255, 127, 17)",
      "hsl": "hsl(28deg 100% 53%)",
      "contrast_score": { "light": "F", "dark": "AAA" }
    },
    "alpha": [
      {
        "hex": "#FF7F1110",
        "rgb": "rgba(255, 127, 17, 0.1)",
        "hsl": "hsl(28deg 100% 53% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#FF7F1120",
        "rgb": "rgba(255, 127, 17, 0.2)",
        "hsl": "hsl(28deg 100% 53% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#FF7F1130",
        "rgb": "rgba(255, 127, 17, 0.3)",
        "hsl": "hsl(28deg 100% 53% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#FF7F1140",
        "rgb": "rgba(255, 127, 17, 0.4)",
        "hsl": "hsl(28deg 100% 53% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#FF7F1150",
        "rgb": "rgba(255, 127, 17, 0.5)",
        "hsl": "hsl(28deg 100% 53% / 50%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#FF7F1160",
        "rgb": "rgba(255, 127, 17, 0.6)",
        "hsl": "hsl(28deg 100% 53% / 60%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#FF7F1170",
        "rgb": "rgba(255, 127, 17, 0.7)",
        "hsl": "hsl(28deg 100% 53% / 70%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#FF7F1180",
        "rgb": "rgba(255, 127, 17, 0.8)",
        "hsl": "hsl(28deg 100% 53% / 80%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#FF7F1190",
        "rgb": "rgba(255, 127, 17, 0.9)",
        "hsl": "hsl(28deg 100% 53% / 90%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#FF7F11",
        "rgb": "rgba(255, 127, 17, 1)",
        "hsl": "hsl(28deg 100% 53% / 100%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "tint": [
      {
        "hex": "#ff8c13",
        "rgb": "rgb(255, 140, 19)",
        "hsl": "hsl(31deg 100% 54%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff9814",
        "rgb": "rgb(255, 152, 20)",
        "hsl": "hsl(34deg 100% 54%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffa516",
        "rgb": "rgb(255, 165, 22)",
        "hsl": "hsl(37deg 100% 54%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffb218",
        "rgb": "rgb(255, 178, 24)",
        "hsl": "hsl(40deg 100% 55%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffbf1a",
        "rgb": "rgb(255, 191, 26)",
        "hsl": "hsl(43deg 100% 55%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffcb1b",
        "rgb": "rgb(255, 203, 27)",
        "hsl": "hsl(46deg 100% 55%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffd81d",
        "rgb": "rgb(255, 216, 29)",
        "hsl": "hsl(50deg 100% 56%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ffe51f",
        "rgb": "rgb(255, 229, 31)",
        "hsl": "hsl(53deg 100% 56%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#fff120",
        "rgb": "rgb(255, 241, 32)",
        "hsl": "hsl(56deg 100% 56%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#fffe22",
        "rgb": "rgb(255, 254, 34)",
        "hsl": "hsl(60deg 100% 57%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "shade": [
      {
        "hex": "#e6720f",
        "rgb": "rgb(230, 114, 15)",
        "hsl": "hsl(28deg 88% 48%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#cc660e",
        "rgb": "rgb(204, 102, 14)",
        "hsl": "hsl(28deg 87% 43%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#b3590c",
        "rgb": "rgb(179, 89, 12)",
        "hsl": "hsl(28deg 87% 37%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#994c0a",
        "rgb": "rgb(153, 76, 10)",
        "hsl": "hsl(28deg 88% 32%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#804009",
        "rgb": "rgb(128, 64, 9)",
        "hsl": "hsl(28deg 87% 27%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#663307",
        "rgb": "rgb(102, 51, 7)",
        "hsl": "hsl(28deg 87% 21%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#4d2605",
        "rgb": "rgb(77, 38, 5)",
        "hsl": "hsl(27deg 88% 16%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#331903",
        "rgb": "rgb(51, 25, 3)",
        "hsl": "hsl(27deg 89% 11%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#1a0d02",
        "rgb": "rgb(26, 13, 2)",
        "hsl": "hsl(27deg 86% 5%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#000000",
        "rgb": "rgb(0, 0, 0)",
        "hsl": "hsl(0deg 0% 0%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      }
    ]
  },
  {
    "name": "green",
    "base": {
      "hex": "#69DC9E",
      "rgb": "rgb(105, 220, 158)",
      "hsl": "hsl(148deg 62% 64%)",
      "contrast_score": { "light": "F", "dark": "AAA" }
    },
    "alpha": [
      {
        "hex": "#69DC9E10",
        "rgb": "rgba(105, 220, 158, 0.1)",
        "hsl": "hsl(148deg 62% 64% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#69DC9E20",
        "rgb": "rgba(105, 220, 158, 0.2)",
        "hsl": "hsl(148deg 62% 64% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#69DC9E30",
        "rgb": "rgba(105, 220, 158, 0.3)",
        "hsl": "hsl(148deg 62% 64% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#69DC9E40",
        "rgb": "rgba(105, 220, 158, 0.4)",
        "hsl": "hsl(148deg 62% 64% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#69DC9E50",
        "rgb": "rgba(105, 220, 158, 0.5)",
        "hsl": "hsl(148deg 62% 64% / 50%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#69DC9E60",
        "rgb": "rgba(105, 220, 158, 0.6)",
        "hsl": "hsl(148deg 62% 64% / 60%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#69DC9E70",
        "rgb": "rgba(105, 220, 158, 0.7)",
        "hsl": "hsl(148deg 62% 64% / 70%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#69DC9E80",
        "rgb": "rgba(105, 220, 158, 0.8)",
        "hsl": "hsl(148deg 62% 64% / 80%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#69DC9E90",
        "rgb": "rgba(105, 220, 158, 0.9)",
        "hsl": "hsl(148deg 62% 64% / 90%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#69DC9E",
        "rgb": "rgba(105, 220, 158, 1)",
        "hsl": "hsl(148deg 62% 64% / 100%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "tint": [
      {
        "hex": "#74f2ae",
        "rgb": "rgb(116, 242, 174)",
        "hsl": "hsl(148deg 83% 70%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#7effbe",
        "rgb": "rgb(126, 255, 190)",
        "hsl": "hsl(150deg 100% 75%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#89ffcd",
        "rgb": "rgb(137, 255, 205)",
        "hsl": "hsl(155deg 100% 77%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#93ffdd",
        "rgb": "rgb(147, 255, 221)",
        "hsl": "hsl(161deg 100% 79%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#9effed",
        "rgb": "rgb(158, 255, 237)",
        "hsl": "hsl(169deg 100% 81%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#a8fffd",
        "rgb": "rgb(168, 255, 253)",
        "hsl": "hsl(179deg 100% 83%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#b3ffff",
        "rgb": "rgb(179, 255, 255)",
        "hsl": "hsl(180deg 100% 85%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#bdffff",
        "rgb": "rgb(189, 255, 255)",
        "hsl": "hsl(180deg 100% 87%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#c8ffff",
        "rgb": "rgb(200, 255, 255)",
        "hsl": "hsl(180deg 100% 89%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#d2ffff",
        "rgb": "rgb(210, 255, 255)",
        "hsl": "hsl(180deg 100% 91%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "shade": [
      {
        "hex": "#5fc68e",
        "rgb": "rgb(95, 198, 142)",
        "hsl": "hsl(147deg 47% 57%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#54b07e",
        "rgb": "rgb(84, 176, 126)",
        "hsl": "hsl(147deg 37% 51%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#4a9a6f",
        "rgb": "rgb(74, 154, 111)",
        "hsl": "hsl(148deg 35% 45%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#3f845f",
        "rgb": "rgb(63, 132, 95)",
        "hsl": "hsl(148deg 35% 38%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#356e4f",
        "rgb": "rgb(53, 110, 79)",
        "hsl": "hsl(147deg 35% 32%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#2a583f",
        "rgb": "rgb(42, 88, 63)",
        "hsl": "hsl(147deg 35% 25%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#20422f",
        "rgb": "rgb(32, 66, 47)",
        "hsl": "hsl(146deg 35% 19%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#152c20",
        "rgb": "rgb(21, 44, 32)",
        "hsl": "hsl(149deg 35% 13%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#0b1610",
        "rgb": "rgb(11, 22, 16)",
        "hsl": "hsl(147deg 33% 6%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#000000",
        "rgb": "rgb(0, 0, 0)",
        "hsl": "hsl(0deg 0% 0%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      }
    ]
  },
  {
    "name": "purple",
    "base": {
      "hex": "#944BBB",
      "rgb": "rgb(148, 75, 187)",
      "hsl": "hsl(279deg 45% 51%)",
      "contrast_score": { "light": "AA", "dark": "F" }
    },
    "alpha": [
      {
        "hex": "#944BBB10",
        "rgb": "rgba(148, 75, 187, 0.1)",
        "hsl": "hsl(279deg 45% 51% / 10%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#944BBB20",
        "rgb": "rgba(148, 75, 187, 0.2)",
        "hsl": "hsl(279deg 45% 51% / 20%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#944BBB30",
        "rgb": "rgba(148, 75, 187, 0.3)",
        "hsl": "hsl(279deg 45% 51% / 30%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#944BBB40",
        "rgb": "rgba(148, 75, 187, 0.4)",
        "hsl": "hsl(279deg 45% 51% / 40%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#944BBB50",
        "rgb": "rgba(148, 75, 187, 0.5)",
        "hsl": "hsl(279deg 45% 51% / 50%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#944BBB60",
        "rgb": "rgba(148, 75, 187, 0.6)",
        "hsl": "hsl(279deg 45% 51% / 60%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#944BBB70",
        "rgb": "rgba(148, 75, 187, 0.7)",
        "hsl": "hsl(279deg 45% 51% / 70%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#944BBB80",
        "rgb": "rgba(148, 75, 187, 0.8)",
        "hsl": "hsl(279deg 45% 51% / 80%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#944BBB90",
        "rgb": "rgba(148, 75, 187, 0.9)",
        "hsl": "hsl(279deg 45% 51% / 90%)",
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "hex": "#944BBB",
        "rgb": "rgba(148, 75, 187, 1)",
        "hsl": "hsl(279deg 45% 51% / 100%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      }
    ],
    "tint": [
      {
        "hex": "#a353ce",
        "rgb": "rgb(163, 83, 206)",
        "hsl": "hsl(279deg 56% 57%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#b25ae0",
        "rgb": "rgb(178, 90, 224)",
        "hsl": "hsl(279deg 68% 62%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#c062f3",
        "rgb": "rgb(192, 98, 243)",
        "hsl": "hsl(279deg 86% 67%)",
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "hex": "#cf69ff",
        "rgb": "rgb(207, 105, 255)",
        "hsl": "hsl(281deg 100% 71%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#de71ff",
        "rgb": "rgb(222, 113, 255)",
        "hsl": "hsl(286deg 100% 72%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ed78ff",
        "rgb": "rgb(237, 120, 255)",
        "hsl": "hsl(292deg 100% 74%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#fc80ff",
        "rgb": "rgb(252, 128, 255)",
        "hsl": "hsl(299deg 100% 75%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff87ff",
        "rgb": "rgb(255, 135, 255)",
        "hsl": "hsl(300deg 100% 76%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff8fff",
        "rgb": "rgb(255, 143, 255)",
        "hsl": "hsl(300deg 100% 78%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      },
      {
        "hex": "#ff96ff",
        "rgb": "rgb(255, 150, 255)",
        "hsl": "hsl(300deg 100% 79%)",
        "contrast_score": { "light": "F", "dark": "AAA" }
      }
    ],
    "shade": [
      {
        "hex": "#8544a8",
        "rgb": "rgb(133, 68, 168)",
        "hsl": "hsl(279deg 42% 46%)",
        "contrast_score": { "light": "AA", "dark": "F" }
      },
      {
        "hex": "#763c96",
        "rgb": "rgb(118, 60, 150)",
        "hsl": "hsl(279deg 43% 41%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#683583",
        "rgb": "rgb(104, 53, 131)",
        "hsl": "hsl(279deg 42% 36%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#592d70",
        "rgb": "rgb(89, 45, 112)",
        "hsl": "hsl(279deg 43% 31%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#4a265e",
        "rgb": "rgb(74, 38, 94)",
        "hsl": "hsl(279deg 42% 26%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#3b1e4b",
        "rgb": "rgb(59, 30, 75)",
        "hsl": "hsl(279deg 43% 21%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#2c1738",
        "rgb": "rgb(44, 23, 56)",
        "hsl": "hsl(278deg 42% 15%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#1e0f25",
        "rgb": "rgb(30, 15, 37)",
        "hsl": "hsl(281deg 42% 10%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#0f0813",
        "rgb": "rgb(15, 8, 19)",
        "hsl": "hsl(278deg 41% 5%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      },
      {
        "hex": "#000000",
        "rgb": "rgb(0, 0, 0)",
        "hsl": "hsl(0deg 0% 0%)",
        "contrast_score": { "light": "AAA", "dark": "F" }
      }
    ]
  }
]
```

</details>

#### Font Size Design Tokens

##### Standard

```tsx
import { fontsize_standard_design_tokens } from '@foundation/design-system': //'@foundation/tokens'
```

<details>
  <summary><small>Design tokens</small></summary>

```json
[
  {
    "name": "small",
    "base": 6,
    "units": 10,
    "ratio": 1.13,
    "values": [
      {
        "px": 6.779999999999999,
        "rem": 0.42374999999999996,
        "pt": 5.084999999999999
      },
      {
        "px": 7.661399999999999,
        "rem": 0.4788374999999999,
        "pt": 5.7460499999999985
      },
      {
        "px": 8.657381999999998,
        "rem": 0.5410863749999999,
        "pt": 6.493036499999999
      },
      {
        "px": 9.782841659999997,
        "rem": 0.6114276037499998,
        "pt": 7.337131244999998
      },
      {
        "px": 11.054611075799995,
        "rem": 0.6909131922374997,
        "pt": 8.290958306849996
      },
      {
        "px": 12.491710515653994,
        "rem": 0.7807319072283746,
        "pt": 9.368782886740496
      },
      {
        "px": 14.115632882689011,
        "rem": 0.8822270551680632,
        "pt": 10.586724662016758
      },
      {
        "px": 15.950665157438582,
        "rem": 0.9969165723399114,
        "pt": 11.962998868078937
      },
      {
        "px": 18.024251627905596,
        "rem": 1.1265157267440997,
        "pt": 13.518188720929196
      }
    ]
  },
  {
    "name": "medium",
    "base": 12,
    "units": 10,
    "ratio": 1.13,
    "values": [
      {
        "px": 13.559999999999999,
        "rem": 0.8474999999999999,
        "pt": 10.169999999999998
      },
      {
        "px": 15.322799999999997,
        "rem": 0.9576749999999998,
        "pt": 11.492099999999997
      },
      {
        "px": 17.314763999999997,
        "rem": 1.0821727499999998,
        "pt": 12.986072999999998
      },
      {
        "px": 19.565683319999994,
        "rem": 1.2228552074999997,
        "pt": 14.674262489999997
      },
      {
        "px": 22.10922215159999,
        "rem": 1.3818263844749994,
        "pt": 16.581916613699992
      },
      {
        "px": 24.983421031307987,
        "rem": 1.5614638144567492,
        "pt": 18.73756577348099
      },
      {
        "px": 28.231265765378023,
        "rem": 1.7644541103361264,
        "pt": 21.173449324033516
      },
      {
        "px": 31.901330314877164,
        "rem": 1.9938331446798228,
        "pt": 23.925997736157875
      },
      {
        "px": 36.04850325581119,
        "rem": 2.2530314534881994,
        "pt": 27.03637744185839
      }
    ]
  },
  {
    "name": "large",
    "base": 24,
    "units": 10,
    "ratio": 1.13,
    "values": [
      {
        "px": 27.119999999999997,
        "rem": 1.6949999999999998,
        "pt": 20.339999999999996
      },
      {
        "px": 30.645599999999995,
        "rem": 1.9153499999999997,
        "pt": 22.984199999999994
      },
      {
        "px": 34.62952799999999,
        "rem": 2.1643454999999996,
        "pt": 25.972145999999995
      },
      {
        "px": 39.13136663999999,
        "rem": 2.4457104149999993,
        "pt": 29.348524979999993
      },
      {
        "px": 44.21844430319998,
        "rem": 2.763652768949999,
        "pt": 33.163833227399984
      },
      {
        "px": 49.966842062615974,
        "rem": 3.1229276289134984,
        "pt": 37.47513154696198
      },
      {
        "px": 56.462531530756046,
        "rem": 3.528908220672253,
        "pt": 42.34689864806703
      },
      {
        "px": 63.80266062975433,
        "rem": 3.9876662893596455,
        "pt": 47.85199547231575
      },
      {
        "px": 72.09700651162238,
        "rem": 4.506062906976399,
        "pt": 54.07275488371678
      }
    ]
  }
]
```

</details>

#### Measurement Design Tokens

##### Standard

```tsx
import { measurement_standard_design_tokens } from '@foundation/design-system': //'@foundation/tokens'
```

<details>
  <summary><small>Design tokens</small></summary>

```json
[
  {
    "name": "small",
    "base": 1,
    "units": 10,
    "ratio": 1.13,
    "values": [
      { "px": 1.13, "rem": 0.070625, "pt": 0.8474999999999999 },
      {
        "px": 1.2768999999999997,
        "rem": 0.07980624999999998,
        "pt": 0.9576749999999998
      },
      {
        "px": 1.4428969999999994,
        "rem": 0.09018106249999996,
        "pt": 1.0821727499999996
      },
      {
        "px": 1.6304736099999992,
        "rem": 0.10190460062499995,
        "pt": 1.2228552074999994
      },
      {
        "px": 1.842435179299999,
        "rem": 0.11515219870624993,
        "pt": 1.3818263844749992
      },
      {
        "px": 2.0819517526089983,
        "rem": 0.1301219845380624,
        "pt": 1.5614638144567488
      },
      {
        "px": 2.352605480448168,
        "rem": 0.1470378425280105,
        "pt": 1.764454110336126
      },
      {
        "px": 2.6584441929064297,
        "rem": 0.16615276205665186,
        "pt": 1.9938331446798223
      },
      {
        "px": 3.0040419379842653,
        "rem": 0.18775262112401658,
        "pt": 2.253031453488199
      }
    ]
  },
  {
    "name": "medium",
    "base": 3,
    "units": 10,
    "ratio": 1.33,
    "values": [
      { "px": 3.99, "rem": 0.249375, "pt": 2.9925 },
      { "px": 5.3067, "rem": 0.33166875, "pt": 3.9800250000000004 },
      {
        "px": 7.057911000000001,
        "rem": 0.44111943750000004,
        "pt": 5.2934332500000005
      },
      {
        "px": 9.387021630000001,
        "rem": 0.5866888518750001,
        "pt": 7.0402662225000014
      },
      {
        "px": 12.484738767900003,
        "rem": 0.7802961729937502,
        "pt": 9.363554075925002
      },
      {
        "px": 16.604702561307004,
        "rem": 1.0377939100816878,
        "pt": 12.453526920980252
      },
      {
        "px": 22.084254406538317,
        "rem": 1.3802659004086448,
        "pt": 16.563190804903737
      },
      {
        "px": 29.372058360695963,
        "rem": 1.8357536475434977,
        "pt": 22.029043770521973
      },
      {
        "px": 39.06483761972563,
        "rem": 2.441552351232852,
        "pt": 29.29862821479422
      }
    ]
  },
  {
    "name": "large",
    "base": 24,
    "units": 10,
    "ratio": 1.33,
    "values": [
      { "px": 31.92, "rem": 1.995, "pt": 23.94 },
      { "px": 42.4536, "rem": 2.65335, "pt": 31.840200000000003 },
      {
        "px": 56.463288000000006,
        "rem": 3.5289555000000004,
        "pt": 42.347466000000004
      },
      {
        "px": 75.09617304000001,
        "rem": 4.693510815000001,
        "pt": 56.32212978000001
      },
      {
        "px": 99.87791014320003,
        "rem": 6.242369383950002,
        "pt": 74.90843260740002
      },
      {
        "px": 132.83762049045603,
        "rem": 8.302351280653502,
        "pt": 99.62821536784202
      },
      {
        "px": 176.67403525230654,
        "rem": 11.042127203269159,
        "pt": 132.5055264392299
      },
      {
        "px": 234.9764668855677,
        "rem": 14.686029180347981,
        "pt": 176.23235016417578
      },
      {
        "px": 312.51870095780504,
        "rem": 19.532418809862815,
        "pt": 234.38902571835376
      }
    ]
  }
]
```

</details>

#### Opacity Design Tokens

##### Standard

```tsx
import { opacity_standard_design_tokens } from '@foundation/design-system': //'@foundation/tokens'
```

<details>
  <summary><small>Design tokens</small></summary>

```json
[
  {
    "base": 1,
    "units": 10,
    "steps": 10,
    "name": "default",
    "values": [
      {
        "value": 0.1,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "value": 0.2,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "value": 0.3,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "value": 0.4,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "value": 0.5,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "AA" }
      },
      {
        "value": 0.6,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AA", "dark": "AAA" }
      },
      {
        "value": 0.7,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AAA", "dark": "AAA" }
      },
      {
        "value": 0.8,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AAA", "dark": "AAA" }
      },
      {
        "value": 0.9,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AAA", "dark": "AAA" }
      },
      {
        "value": 1,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AAA", "dark": "AAA" }
      }
    ]
  }
]
```

</details>

##### Extended

```tsx
import { opacity_extended_design_tokens } from '@foundation/design-system': //'@foundation/tokens'
```

<details>
  <summary><small>Design tokens</small></summary>

```json
[
  {
    "base": 0.5,
    "units": 10,
    "steps": 10,
    "name": "extended",
    "values": [
      {
        "value": 0.05,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "value": 0.15,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "value": 0.25,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "value": 0.35,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "value": 0.45,
        "usage": ["backdrop", "transparent"],
        "contrast_score": { "light": "F", "dark": "F" }
      },
      {
        "value": 0.55,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AA", "dark": "AA" }
      },
      {
        "value": 0.65,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AAA", "dark": "AAA" }
      },
      {
        "value": 0.75,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AAA", "dark": "AAA" }
      },
      {
        "value": 0.85,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AAA", "dark": "AAA" }
      },
      {
        "value": 0.95,
        "usage": ["icons", "animations", "layout"],
        "contrast_score": { "light": "AAA", "dark": "AAA" }
      }
    ]
  }
]
```

</details>

#### Depth Design Tokens

##### Standard

```tsx
import { depth_standard_design_tokens } from '@foundation/design-system': //'@foundation/tokens'
```

<details>
  <summary><small>Design tokens</small></summary>

```json
[
  {
    "base": 10,
    "units": 10,
    "steps": 10,
    "name": "default",
    "values": [
      {
        "value": 10,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 20,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 30,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 40,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 50,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 60,
        "usage": ["fixed", "off-canvas", "overlay"],
        "stack_order": { "label": "median", "score": 2 }
      },
      {
        "value": 70,
        "usage": ["notification", "above-content"],
        "stack_order": { "label": "high", "score": 3 }
      },
      {
        "value": 80,
        "usage": ["notification", "above-content"],
        "stack_order": { "label": "high", "score": 3 }
      },
      {
        "value": 90,
        "usage": ["notification", "above-content"],
        "stack_order": { "label": "high", "score": 3 }
      },
      {
        "value": 100,
        "usage": ["notification", "above-content"],
        "stack_order": { "label": "high", "score": 3 }
      }
    ]
  }
]
```

</details>

##### Extended

```tsx
import { depth_extended_design_tokens } from '@foundation/design-system': //'@foundation/tokens'
```

<details>
  <summary><small>Design tokens</small></summary>

```json
[
  {
    "base": 10.1,
    "units": 10,
    "steps": 10,
    "name": "extended",
    "values": [
      {
        "value": 10.1,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 20.1,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 30.1,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 40.1,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 50.1,
        "usage": ["base", "toolbar", "dropdown"],
        "stack_order": { "label": "low", "score": 1 }
      },
      {
        "value": 60.1,
        "usage": ["fixed", "off-canvas", "overlay"],
        "stack_order": { "label": "median", "score": 2 }
      },
      {
        "value": 70.1,
        "usage": ["notification", "above-content"],
        "stack_order": { "label": "high", "score": 3 }
      },
      {
        "value": 80.1,
        "usage": ["notification", "above-content"],
        "stack_order": { "label": "high", "score": 3 }
      },
      {
        "value": 90.1,
        "usage": ["notification", "above-content"],
        "stack_order": { "label": "high", "score": 3 }
      },
      {
        "value": 100.1,
        "usage": ["notification", "above-content"],
        "stack_order": { "label": "high", "score": 3 }
      }
    ]
  }
]
```

</details>
