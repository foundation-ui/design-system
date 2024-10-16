import { createGlobalStyle } from "styled-components";

export const TypographyRoot = createGlobalStyle`
    * {
        color: var(--font-color);
    }
    html {
        font-family: ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
    }
    h2, h3, h4, h5, h6 {
        font-weight: 600;
    }
    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
    }
    h1 {
        font-size: var(--fontsize-large-30);
    }
    h2 {
        font-size: var(--fontsize-large-10);
    }
    h3 {
        font-size: var(--fontsize-medium-40);
    }
    h4, h5, h6 {
        font-size: var(--fontsize-medium-30);
    }
    p, li, blockquote {
        font-size: var(--fontsize-small-90);
        font-weight: 400;
    }
`;
