import { createGlobalStyle } from "styled-components";

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
