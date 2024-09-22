import { createGlobalStyle } from "styled-components";

export const TypographySizing = createGlobalStyle`
    h1, h2, h3, h4, h5, h6, p {
        letter-spacing: -0.3px;

        &[data-condensed="tight"] {
            letter-spacing: -0.6px;
        }
        &[data-condensed="condensed"] {
            letter-spacing: -0.9px;
        }
    }
`;
export const TypographyColors = createGlobalStyle`
    * {
        color: var(--font-color);
    }
`;
