# Getting started

### Install

Foundation Design System should be installed as a `dependency` of your app.

```shell
npm install @foundation/design-system
```

**_Or_**, you can install Foundation's packages separatly as `dependency`.

**_Core:_**

```shell
npm install @foundation/core
```

**_Tokens:_**

```shell
npm install @foundation/tokens
```

**_Components:_**

```shell
npm install @foundation/components
```

_If you plan to use every packages in your app, considere adding `@foundation/design-system` as a `dependency` instead of the three distinct packages._

### Setup

Foundation Design System is styled using CSS in JS with [styled-components](https://styled-components.com/). This technique, coupled with `@foundation/core`, requires a [GlobalStyle](https://styled-components.com/docs/faqs#note-regarding-css-import-and-createglobalstyle) definition to convert your Design Tokens Library as CSS variables.

The Theme definition is based on styled-components [theming](https://styled-components.com/docs/advanced#theming) support. **_If you are planning to use the `styled` version of the component library, include the `SystemThemeProvider` context in your setup definition_**.

Optionally, you can add the `ColorModeProvider` to support the , provided by `@foundation/core`. It enables you to switch between Themes based on user preferences.

Foundation Design System comes with a set of pre-built GlobalStyles definitions to ensure a consistent visual language across all your apps, regardless of platform or device.

```tsx
import { StrictMode } from "react";
import * as ReactDOM from "react-dom";

import {
  SystemThemeProvider,
  DesignTokensProvider,
  ColorModeProvider,
  CSSRoot,
  ResetStyles,
  TypographyColors,
  TypographySizing,
} from "@foundation/design-system";

ReactDOM.render(
  <StrictMode>
    {/** Providers **/}
    <DesignTokensProvider tokenLibrary={/**/}>
      <ColorModeProvider>
        <SystemThemeProvider theme={/**/}>
          {/** Design Tokens as CSS Vars **/}
          <CSSRoot />

          {/** GlobalStyles **/}
          <ResetStyles />
          <TypographyColors />
          <TypographySizing />

          <App />
        </SystemThemeProvider>
      </ColorModeProvider>
    </DesignTokensProvider>
  </StrictMode>,
  document.getElementById("root")
);
```

### Usage

That's it! You can now use Foundation Design System.

```tsx
import React from "react";
import { Button, ColorModeContext } from "@foundation/design-system";

export default () => {
  const { colorMode, setColorMode } = React.useContext(ColorModeContext);

  const updateColorMode = () => {
    if (colorMode === "dark") setColorMode("light");
    else if (colorMode === "light") setColorMode("dark");
  };

  return (
    <Button sizing="small" variant="ghost">
      Color mode:&nbsp;{colorMode}
    </Button>
  );
};
```
