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
    }

    body {
        margin: 0;
        font-family: sans-serif;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
        line-height: 1.1em;
    }

    main {
        margin: 0 auto;
    }
`;
