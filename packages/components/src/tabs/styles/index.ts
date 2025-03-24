import styled from "styled-components";

export const TabWrapper = styled.div<any>`
  button {
    &[aria-selected="true"] {
      color: var(--font-color) !important;
    }
  }
`;
