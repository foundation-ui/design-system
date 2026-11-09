import { css } from "styled-components";

export type ShapeStyle = string | ReturnType<typeof css>;

export const createShapeStyles = (shapes: {
  square?: ShapeStyle;
  smooth: ShapeStyle;
  round: ShapeStyle;
}) => css`
  &[data-shape="square"] {
    ${shapes.square ?? "border-radius: 0;"}
  }
  &[data-shape="smooth"] {
    ${shapes.smooth}
  }
  &[data-shape="round"] {
    ${shapes.round}
  }
`;
