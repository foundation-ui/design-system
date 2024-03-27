# Styling components

Foundation Design System are styled using CSS in JS with [styled-components](https://styled-components.com/). You can use your prefered styling technique coupled with `@foundation/components` but we recommand you to use it as well to make it easier to access both CSS variables and theme values.

_Each component comes with styled by default; if you want to use the unstyled version, pass the `raw` property as described by the component doc._

### Usage

Once the setup complete and if you've followed the Foundation Design System guides, you'll be able to use your Design Tokens as theme values and CSS variables directly in your components as follows:

```tsx
import { css } from "styled-components";
import { Button } from "@foundation/design-system";

export const PaddedFlexBox = css`
  display: flex;
  gap: var(--measurement-medium-10);
  padding: var(--measurement-medium-30);
`;
export const ButtonDefaultStyles = css`
  font-size: var(--fontsize-medium-20);
  border: var(--measurement-small-10) solid transparent;
  color: ${({ theme }) => theme.colors.primary.contrast};
  background-color: ${({ theme }) => theme.colors.primary.base};
`;

export const SampleButton = styled(Button)`
  ${ButtonDefaultStyles}
  ${PaddedFlexBox}
`;
```

If you did not followed the Foundation Design System guides, you may be unable to use your Design Tokens as showed in the previous example.
