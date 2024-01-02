import styled, { css } from "styled-components";

const AvatarSizesStyles = css`
  &[data-size="small"] {
    width: var(--measurement-large-10);
    height: var(--measurement-large-10);
  }

  &[data-size="medium"] {
    width: var(--measurement-medium-90);
    height: var(--measurement-medium-90);
  }

  &[data-size="large"] {
    width: var(--measurement-large-20);
    height: var(--measurement-large-20);
  }
`;
const AvatarStatusesStyles = css`
  &[data-status="online"] {
    fill: var(--shade-green-10);
    stroke: var(--shade-green-20);
  }

  &[data-status="away"] {
    fill: var(--color-yellow);
    stroke: var(--shade-yellow-10);
  }

  &[data-status="busy"] {
    fill: var(--color-red);
    stroke: var(--shade-red-10);
  }

  &[data-status="offline"] {
    fill: ${({ theme }) => theme.colors.body.base};
    stroke: ${({ theme }) => theme.colors.text.alpha[0].rgb};
  }
`;

export const AvatarWrapper = styled.div`
  &[data-raw="false"] {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.body.contrast};
    border-radius: 100%;

    img {
      width: inherit;
      border-radius: 100%;
    }

    ${AvatarSizesStyles}
  }
`;
export const StatusWrapper = styled.svg`
  --status-position: calc(
    var(--measurement-medium-10) - (var(--measurement-medium-10) * 2)
  );

  position: absolute;
  stroke-width: var(--measurement-small-30);
  bottom: var(--status-position);
  right: var(--status-position);

  ${AvatarStatusesStyles}
`;
