import styled, { css } from "styled-components";

const AvatarSizesStyles = css`
  &[data-size="small"] {
    width: var(--measurement-large-10);
    height: var(--measurement-large-10);
    min-width: var(--measurement-large-10);
    min-height: var(--measurement-large-10);
  }

  &[data-size="medium"] {
    width: var(--measurement-medium-90);
    height: var(--measurement-medium-90);
    min-width: var(--measurement-medium-90);
    min-height: var(--measurement-medium-90);
  }

  &[data-size="large"] {
    width: var(--measurement-large-20);
    height: var(--measurement-large-20);
    min-width: var(--measurement-large-20);
    min-height: var(--measurement-large-20);
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
    fill: var(--body-color);
    stroke: var(--font-color-alpha-10);
  }
`;

export const AvatarWrapper = styled.div`
  &[data-raw="false"] {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--body-color);
    border-radius: 100%;

    img {
      width: inherit;
      height: inherit;
      min-width: inherit;
      min-height: inherit;
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
