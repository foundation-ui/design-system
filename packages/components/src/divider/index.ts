import styled from "styled-components";

export const Divider = styled.hr`
  height: var(--measurement-small-10);
  margin: var(--measurement-medium-30) 0;
  background: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  border: none;
`;
