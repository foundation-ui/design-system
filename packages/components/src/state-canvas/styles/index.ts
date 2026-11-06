import styled from "styled-components";

export const AnalysisWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
`;
