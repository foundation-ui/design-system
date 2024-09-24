import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

export const ResetStyles = createGlobalStyle`

    ${normalize()}

    *, *:before, *:after {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: antialiased;
    }

    html {
        box-sizing: border-box;
        font-size: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    html,
    body {
        height: 100%;
        margin: 0;
    }

    main {
        margin: 0 auto;
    }
`;
