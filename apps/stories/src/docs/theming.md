# Theming

Foundation Design System comes with built-in themes definitions using [styled-components ThemeProvider](https://styled-components.com/docs/advanced#theming). Coupled with `@foundation-ui/core` and `@foundation-ui/tokens`, you'll be able to create your custom theme using values from your custom Design Tokens library.

`@foundation-ui/design-system` provide a set of method to help you define your theme, however, you can do it using the technology you want! The `SystemThemeProvider` component used at to root level of your application is optional and can be replaced by your prefered method.

### Setup

If you plan to use the `@foundation-ui/design-system` set of methods to generate your theme definition, you'll need to have `@foundation-ui/core` and `@foundation-ui/tokens` dependencies installed to fetch and use Design Tokens from you library in your application. You can use you own implementation if you want since the helpers provided by Foundation Design System are only here to help you quickly define you theme.

- Define your theme values

```ts
import {
  json_design_tokens,
  GetColorTokenBase,
  GetTokenFromSource,
} from "@foundation-ui/tokens";

export const custom_color_theme = {
  primary: {
    base: GetColorTokenBase({
      source: json_design_tokens,
      token_category: "color",
      query: "blue",
    }),
    alpha: GetTokenFromSource({
      source: json_design_tokens,
      token_category: "color",
      query: "blue",
    })?.alpha,
    contrast: GetColorTokenBase({
      source: json_design_tokens,
      token_category: "color",
      query: "dark-blue",
    }),
  },
  /* ... */
};
```

- Use it in your application

```tsx
import { StrictMode } from "react";
import * as ReactDOM from "react-dom";

import {
  SystemThemeProvider,
  DesignTokensProvider,
} from "@foundation-ui/design-system";

import { custom_dt_library } from "./yourpath";
import { custom_color_theme } from "./yourpath";

ReactDOM.render(
  <StrictMode>
    {/** Providers **/}
    <DesignTokensProvider tokenLibrary={custom_dt_library}>
      <SystemThemeProvider theme={custom_color_theme}>
        {/** ... **/}
        <App />
      </SystemThemeProvider>
    </DesignTokensProvider>
  </StrictMode>,
  document.getElementById("root")
);
```

### Usage

Once the setup complete and if you've followed the Foundation Design System guides using styled-components, you'll be able to use your theme values directly in your components as follows:

```tsx
import styled from "styled-components";
import { Button } from "@foundation-ui/design-system";

const CustomButton = styled(Button)`
    color: ${({ theme }) => theme.colors.primary.contrast};
    background-color: ${({ theme }) => theme.colors.primary.base};
  ...
`;
```

If you've opted not to use the `SystemThemeProvider` or [styled-components ThemeProvider](https://styled-components.com/docs/advanced#theming), you may be unable to use your theme values as showed in the previous example.
