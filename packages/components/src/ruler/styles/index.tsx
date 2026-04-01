import styled, { css } from "styled-components";
import { RULER_SIZE } from "../constants";

const activeGuideStyles = css`
  background-color: var(--color-orange);
  transition: background ease-in-out 0.2s;
`;

const inactiveGuideStyles = css`
  background-color: var(--alpha-orange-60);
  transition: background ease-in-out 0.2s;
`;

export const RulerBase: any = styled.div`
  position: absolute;
  background-color: transparent;
  user-select: none;
  overflow: hidden;
  z-index: var(--depth-default-100);
`;

export const HorizontalRuler: any = styled(RulerBase)`
  top: 0;
  left: ${RULER_SIZE}px;
  right: 0;
  height: var(--measurement-medium-70);
  /* border-bottom: var(--measurement-small-30) solid var(--font-color-alpha-10); */
  cursor: s-resize;
`;

export const VerticalRuler: any = styled(RulerBase)`
  top: ${RULER_SIZE}px;
  left: 0;
  bottom: 0;
  width: ${RULER_SIZE}px;
  /* border-right: var(--measurement-small-30) solid var(--font-color-alpha-10); */
  cursor: e-resize;
`;

export const CornerSquare: any = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${RULER_SIZE}px;
  height: ${RULER_SIZE}px;
  background-color: transparent;

  z-index: var(--depth-default-100);
`;

export const HTickContainer: any = styled.div<{ $x: number }>`
  position: absolute;
  top: 0;
  left: ${({ $x }) => $x}px;
`;

export const VTickContainer: any = styled.div<{ $y: number }>`
  position: absolute;
  left: 0;
  top: ${({ $y }) => $y}px;
`;

export const HTickMark: any = styled.div<{ $major: boolean }>`
  width: var(--measurement-small-30);
  height: ${({ $major }) => ($major ? 6 : 3)}px;
  background-color: ${({ $major }) =>
    $major ? "var(--font-color-alpha-20)" : "var(--font-color-alpha-10)"};
`;

export const VTickMark: any = styled.div<{ $major: boolean }>`
  height: var(--measurement-small-30);
  width: ${({ $major }) => ($major ? 6 : 3)}px;
  background-color: ${({ $major }) =>
    $major ? "var(--font-color-alpha-30)" : "var(--font-color-alpha-10)"};
`;

export const HTickLabel: any = styled.span`
  position: absolute;

  top: var(--fontsize-small-30);
  left: calc(var(--fontsize-small-30) / 1.25 * -1);

  font-size: var(--fontsize-small-30);
  color: var(--font-color-alpha-30);

  font-family: monospace;
  user-select: none;
`;

export const VTickLabel: any = styled.span`
  position: absolute;

  top: calc(var(--fontsize-small-30) / 1.25 * -1);
  left: var(--fontsize-small-30);

  font-size: var(--fontsize-small-30);
  color: var(--font-color-alpha-30);

  font-family: monospace;
  user-select: none;

  writing-mode: vertical-rl;
  transform: rotate(180deg);
`;

export const VerticalGuideLine: any = styled.div<{
  $x: number;
  $active: boolean;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: var(--measurement-small-30);
  cursor: col-resize;
  z-index: var(--depth-default-90);
  left: ${({ $x }) => $x}px;
  ${({ $active }) => ($active ? activeGuideStyles : inactiveGuideStyles)}
`;

export const HorizontalGuideLine: any = styled.div<{
  $y: number;
  $active: boolean;
}>`
  position: absolute;
  left: 0;
  right: 0;
  height: var(--measurement-small-30);
  cursor: row-resize;
  z-index: var(--depth-default-90);
  top: ${({ $y }) => $y}px;
  ${({ $active }) => ($active ? activeGuideStyles : inactiveGuideStyles)}

  transition: bakground ease-in-out 0.2s;
`;

export const CanvasContent: any = styled.div<{ $isDragging?: boolean }>`
  position: absolute;
  inset: 0;
  overflow: hidden;

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      pointer-events: none;
      user-select: none;
    `}
`;

export const CanvasWrapper: any = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
