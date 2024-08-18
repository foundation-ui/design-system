import styled, { keyframes } from "styled-components";
import { Field } from "@foundation-ui/components";

const LoaderAnimation = keyframes`
  100% { height: 40% }
`;

export const BorderedBox = styled(Field.Wrapper)`
  --border: var(--measurement-small-10) solid
    ${({ theme }) => theme.colors.text.alpha[0].rgb};

  border-top: var(--border);
  border-bottom: var(--border);
`;
export const CardBody = styled.article`
  box-sizing: border-box;
  border-radius: var(--measurement-medium-30);
  border: 1px solid ${({ theme }) => theme.colors.text.alpha[0].rgb};
  background: ${({ theme }) => theme.colors.body.alpha[0].rgb};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  gap: var(--measurement-medium-30);
  padding: var(--measurement-medium-60);
  max-width: var(--measurement-large-80);
  aspect-ratio: 2.1;
  width: 100%;
`;
export const Loader3D = styled.div`
  --size: 12px;
  --dimension: calc(0.353 * var(--size));

  height: calc(var(--size) + var(--dimension));
  aspect-ratio: 1;
  display: grid;

  &::before {
    content: "";
    height: 100%;
    margin: auto 0;
    clip-path: polygon(
      var(--dimension) 0,
      100% 0,
      100% calc(100% - var(--dimension)),
      calc(100% - var(--dimension)) 100%,
      0 100%,
      0 var(--dimension)
    );
    background: conic-gradient(
      from -90deg at var(--size) var(--dimension),
      ${({ theme }) => theme.colors.text.alpha[8].rgb} 135deg,
      ${({ theme }) => theme.colors.text.alpha[5].rgb} 0 270deg,
      ${({ theme }) => theme.colors.text.alpha[3].rgb} 0
    );

    animation: ${LoaderAnimation} 0.8s infinite alternate;
  }
`;
