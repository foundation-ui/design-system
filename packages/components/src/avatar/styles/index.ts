import styled, { css } from "styled-components";

const AvatarSizesStyles = css`
  &[data-size="small"] {
    width: var(--measurement-medium-70);
    height: var(--measurement-medium-70);
    min-width: var(--measurement-medium-70);
    min-height: var(--measurement-medium-70);
  }

  &[data-size="medium"] {
    width: var(--measurement-large-10);
    height: var(--measurement-large-10);
    min-width: var(--measurement-large-10);
    min-height: var(--measurement-large-10);
  }

  &[data-size="large"] {
    width: var(--measurement-large-20);
    height: var(--measurement-large-20);
    min-width: var(--measurement-large-20);
    min-height: var(--measurement-large-20);
  }
`;
const AvatarShapesStyles = css`
  &[data-shape="square"] {
    border-radius: 0;
    img {
      border-radius: 0;
    }
  }
  &[data-shape="smooth"] {
    border-radius: var(--measurement-medium-30);
    img {
      border-radius: var(--measurement-medium-30);
    }
  }
  &[data-shape="round"] {
    border-radius: 100%;
    img {
      border-radius: 100%;
    }
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
    stroke: var(--contrast-color);
  }
`;

export const AvatarWrapper = styled.div`
  &[data-raw="false"] {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--font-color-alpha-10);
    border: var(--measurement-small-10) solid var(--font-color-alpha-10);

    img {
      width: inherit;
      height: inherit;
      min-width: inherit;
      min-height: inherit;
      border: var(--measurement-small-10) solid var(--font-color-alpha-10);
    }

    ${AvatarShapesStyles}
    ${AvatarSizesStyles}
  }
`;
export const StatusWrapper = styled.svg`
  --status-position: calc(
    var(--measurement-medium-10) - (var(--measurement-medium-10) * 2)
  );

  position: absolute;
  stroke-width: var(--measurement-small-10);
  bottom: var(--status-position);
  right: var(--status-position);

  ${AvatarStatusesStyles}
`;
export const BadgeWrapper = styled.div`
  --status-position: calc(
    var(--measurement-medium-10) - (var(--measurement-medium-10) * 2)
  );

  position: absolute;

  bottom: var(--status-position);
  right: var(--status-position);

  width: var(--measurement-medium-60);
  height: var(--measurement-medium-60);

  background-color: var(--font-color-alpha-10);
  border-radius: 100%;

  img {
    width: inherit;
    height: inherit;
    min-width: inherit;
    min-height: inherit;
    border-radius: 100%;
    border: var(--measurement-small-10) solid var(--font-color-alpha-10);
  }
`;
