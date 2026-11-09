import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../";
import { FadeInKeyframes } from "../../css/AnimationStyles";

const TooltipVariantsStyles = css`
  &[data-variant="primary"] {
    background-color: var(--font-color);
    background: linear-gradient(
      180deg,
      var(--font-color) 50%,
      var(--font-color-alpha-60) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;

    span {
      color: var(--body-color) !important;
    }
  }
  &[data-variant="secondary"] {
    background-color: var(--body-color);
    background: linear-gradient(
      180deg,
      var(--body-color) 50%,
      var(--font-color-alpha-10) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
  }
`;
const TooltipSizesStyles = css`
  &[data-size="small"] {
    max-width: var(--measurement-large-60);
    * {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  &[data-size="medium"] {
    max-width: var(--measurement-large-80);
    * {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  &[data-size="large"] {
    max-width: var(--measurement-large-80);
  }
`;
const TooltipHintStyles = css`
  &[data-variant="primary"] {
    background: var(--body-color-alpha-20);
    color: var(--font-color-alpha-60);
  }
  &[data-variant="secondary"] {
    background: var(--font-color-alpha-10);
    color: var(--font-color-alpha-60);
  }
`;

export const ShortcutBox = styled.span`
  border-radius: var(--measurement-medium-10);

  font-size: var(--fontsize-small-50);
  font-weight: 500;

  padding: var(--measurement-small-30) var(--measurement-medium-10);
  margin: 0;
  ${TooltipHintStyles}
`;
export const ContentBox = styled.div<any>`
  display: inline-block;
  position: relative;
`;
export const ContentWrapper = styled.span<any>`
  &[data-raw="false"] {
    ${InsetShadowCSSVariable}

    width: fit-content;
    padding: var(--measurement-medium-10) var(--measurement-medium-30);

    box-shadow: var(--inset-shadow);

    border-radius: var(--measurement-medium-30);
    -webkit-backdrop-filter: blur(var(--measurement-small-10));
    backdrop-filter: blur(var(--measurement-small-10));

    font-size: var(--fontsize-small-60);
    font-weight: 500;

    z-index: var(--depth-default-100);

    animation-duration: 0.2s;
    animation-name: ${FadeInKeyframes};
    animation-fill-mode: backwards;

    ${TooltipSizesStyles}
    ${TooltipVariantsStyles}
  }
`;
