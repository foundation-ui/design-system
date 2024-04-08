# Design Tokens System

Foundation Design System comes with a large [built-in library of Design Tokens](?path=/docs/assets--documentation), you'll find colors, font-sizes, spacings, opacities and depths definitions. Each design token come with a key-value and a set of annotations that you can use in your application. If you want to create custom Design Tokens, Foundation Design System provides a set of methods enabling you to generate and use your custom library.

#### What are Design Tokens?

Design tokens are the smallest units of a design system that define the visual properties of a user interface, such as color, typography, spacing,.. They are usually represented as key-value pairs in a JSON file and can be consumed by different platforms, such as web, mobile, and desktop applications. Design tokens provide a single source of truth for all design decisions and enable designers and developers to work more collaboratively and efficiently.

#### Why Should Design Tokens be Used?

Design tokens offer several benefits over traditional design approaches:

- Consistency: Design tokens ensure that all UI elements have a consistent look and feel across different platforms and devices.
- Scalability: Design tokens can be easily updated and extended to accommodate new design requirements, making it easier to scale a design system.
- Efficiency: Design tokens reduce the need for manual coding and enable developers to quickly implement design changes.
- Accessibility: Design tokens can be used to create accessible designs by defining appropriate color contrast ratios, font sizes, and other accessibility-related properties.

### Setup

Foundation Design System uses a custom Design Tokens System and requires a context and a structured design tokens library, make sure to have the `DesignTokensProvider` context in your application setup. You can use a custom design tokens library by passing it using the `tokenLibrary` property but it must be structured as defined in the type definition.

Go to the [Generators documentation](?path=/docs/generators--documentation) to read how to generate your custom Design Tokens Library.

```tsx
import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { DesignTokensProvider } from "@foundation-ui/design-system";

const custom_design_tokens = {
  /**/
};

ReactDOM.render(
  <StrictMode>
    <DesignTokensProvider tokenLibrary={custom_design_tokens}>
      ...
      <App />
    </DesignTokensProvider>
  </StrictMode>,
  document.getElementById("root")
);
```

#### CSS Variables

Foundation Design System is styled using CSS in JS with [styled-components](https://styled-components.com/). This technique requires a [GlobalStyle](https://styled-components.com/docs/faqs#note-regarding-css-import-and-createglobalstyle) definition to convert your Design Tokens Library as CSS variables. The `generateCSSVariables` function allow you to create CSS based on your design tokens library and let you decide for, for each type of value, if it has to be available as variable or not.

- Generate CSS Vars

```tsx
import { createGlobalStyle } from "styled-components";
import { generateCSSVariables } from "@foundation-ui/design-system";

const custom_design_tokens = {
  /**/
};
const cssVariables = generateCSSVariables(custom_design_tokens);
export const CustomCSSRoot = createGlobalStyle`
  :root {
    ${cssVariables.color}
    ${cssVariables.alpha}
    ${cssVariables.tint}
    ${cssVariables.shade}
    ${cssVariables.fontsize}
    ${cssVariables.measurement}
    ${cssVariables.depth}
    ${cssVariables.opacity}
  }
`;
```

- Add CSS Vars in your application

```tsx
ReactDOM.render(
  <StrictMode>
    <DesignTokensProvider tokenLibrary={custom_design_tokens}>
      ...
      <CustomCSSRoot />
      <App />
    </DesignTokensProvider>
  </StrictMode>,
  document.getElementById("root")
);
```

You will then be able to use the design tokens you've selected to be converted as CSS vars in your application.

```tsx
import { css } from "styled-components";

const ButtonDefaultStyles = css`
  gap: var(--measurement-medium-30);
  font-size: var(--fontsize-medium-20);
  border: var(--measurement-small-10) solid transparent;
  ...
`;
```
