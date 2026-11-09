import styled from "styled-components";
import {
  HiddenScrollbar,
  CustomScrollbar,
} from "../../css/ScrollbarStyles";

export const ScrollAreaWrapper = styled.div<any>`
  overflow: auto;

  &[data-scrollbar="true"] {
    ${CustomScrollbar}
  }
  &[data-scrollbar="false"] {
    ${HiddenScrollbar}
  }
`;
