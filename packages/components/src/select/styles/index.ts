// select/styles.ts
import styled from "styled-components";
import { MenuItemStyles } from "../../css/MenuStyles";
import {
  FieldDefaultStyles,
  FieldVariantsStyles,
  FieldSizeStyles,
  FieldShapeStyles,
} from "../../field/styles";
import { InsetShadowCSSVariable } from "../../";
import { createSlideInY } from "../../css/AnimationStyles";

const SlideInDown = createSlideInY("calc(var(--measurement-small-60) * -1)");
const SlideInUp = createSlideInY("var(--measurement-small-60)");

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Trigger = styled.button<any>`
  all: unset;
  box-sizing: border-box;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--measurement-medium-10);

  ${FieldDefaultStyles}
  ${FieldVariantsStyles}
  ${FieldShapeStyles}
  ${FieldSizeStyles}


  cursor: pointer !important;
`;

export const Label = styled.span<any>`
  flex: 1;
  text-align: left;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Content = styled.ul<any>`
  ${InsetShadowCSSVariable}

  &[data-raw="false"] {
    position: fixed;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    list-style: none;

    background-color: var(--body-color);

    box-shadow: var(--inset-shadow);
    border-radius: var(--measurement-medium-30);

    z-index: var(--depth-default-100);

    height: auto;
    max-height: var(--measurement-large-90);
    overflow-y: auto;

    animation-duration: 0.2s;
    animation-fill-mode: backwards;

    &[data-side="bottom"] {
      animation-name: ${SlideInDown};
    }

    &[data-side="top"] {
      animation-name: ${SlideInUp};
    }
  }
`;

export const List = styled.li<any>`
  ${MenuItemStyles}
`;

export const Item = styled.span`
  display: flex;
  align-items: center;
  gap: var(--measurement-small-60);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
