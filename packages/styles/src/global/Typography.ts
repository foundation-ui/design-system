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
        color: ${({ theme }) => theme.colors.text.base};
        &[data-emphasis-level="medium"] {
           color: ${({ theme }) => theme.colors.text.alpha[8].rgb};
        }
        &[data-emphasis-level="low"] {
           color: ${({ theme }) => theme.colors.text.alpha[5].rgb};
        }
    }
`;
