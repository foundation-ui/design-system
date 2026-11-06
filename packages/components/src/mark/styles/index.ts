"use client";

import styled, { css } from "styled-components";
import { InsetShadowCSSVariable } from "../../";

const MarkVariantsStyles = css`
  &[data-variant="primary"] {
    background-color: var(--font-color);
    background: linear-gradient(
      180deg,
      var(--font-color) 50%,
      var(--font-color-alpha-60) 100%
    );
    background-size: 100% 200%;
    background-position: 0% 50%;
    box-shadow: 0 var(--measurement-small-20) var(--measurement-small-20)
      calc(var(--measurement-small-10) * -1) var(--alpha-mono-darkest-60);

    color: var(--body-color) !important;
    svg * {
      stroke: var(--body-color) !important;
    }
  }
  &[data-variant="secondary"] {
    box-shadow: var(--inset-shadow);

    background-color: var(--font-color-alpha-10);
    color: var(--font-color-alpha-80) !important;
  }
  &[data-variant="tertiary"] {
    box-shadow: var(--inset-shadow);

    background-color: var(--contrast-color);
    color: var(--font-color-alpha-80) !important;
  }
  &[data-variant="mono"] {
    box-shadow: var(--inset-shadow);

    background-color: var(--body-color);
    color: var(--font-color-alpha-80) !important;
  }
  &[data-variant="border"] {
    background-color: transparent;
    border: var(--measurement-small-10) solid var(--font-color-alpha-10);
    color: var(--font-color-alpha-60) !important;
  }
  &[data-variant="danger"] {
    box-shadow: var(--inset-shadow);

    background-color: var(--color-red) !important;
    color: var(--color-mono-white) !important;
  }
  &[data-variant="warning"] {
    box-shadow: var(--inset-shadow);

    background-color: var(--color-orange) !important;
    color: var(--color-mono-dark) !important;
  }
  &[data-variant="success"] {
    box-shadow: var(--inset-shadow);

    background-color: var(--color-green) !important;
    color: var(--color-mono-white) !important;
  }
  &[data-variant="meta"] {
    box-shadow: var(--inset-shadow);

    background-color: var(--color-blue) !important;
    color: var(--color-mono-white) !important;
  }
  &[data-variant="hint"] {
    box-shadow: var(--inset-shadow);

    background-color: var(--color-purple) !important;
    color: var(--color-mono-white) !important;
  }
`;

export const MarkWrapper = styled.span`
  ${InsetShadowCSSVariable}

  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;

  border-radius: var(--measurement-medium-10);
  font-weight: 500;

  padding: var(--measurement-small-30) var(--measurement-medium-10);
  margin: 0;

  &[data-fontFamily="monospace"] {
    font-family: monospace;
    letter-spacing: calc(var(--measurement-small-10) * -0.5);
  }

  ${MarkVariantsStyles}
`;
