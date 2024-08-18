import styled from "styled-components";

export const TabWrapper = styled.div`
  button {
    &[aria-selected="true"] {
      color: ${({ theme }) => theme.colors.text.base} !important;
    }
  }
`;
