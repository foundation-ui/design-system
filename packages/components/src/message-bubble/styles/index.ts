import styled from "styled-components";
import { Badge, IBadgeProperties } from "../../";

export const MessageBubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--measurement-medium-10);

  &[data-side="right"] {
    align-items: flex-end;
  }

  &[data-side="left"] {
    align-items: flex-start;
  }
`;

export const MessageBubbleBadge: React.FC<IBadgeProperties> = styled(Badge)`
  position: relative;
  max-width: var(--measurement-large-90);
  width: 100%;
  justify-self: flex-end;
  padding: var(--measurement-medium-30) var(--measurement-medium-50) !important;

  &[data-side="left"] {
    border-top-left-radius: 0 !important;
  }

  &[data-side="right"] {
    border-top-right-radius: 0 !important;
  }
`;

export const MessageBubbleContentWrapper = styled.div`
  line-height: 1.3;
  font-weight: 500;
  word-break: keep-all;
  width: 100%;

  * {
    font-size: inherit !important;
  }
`;

export const MessageBubbleMetaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--measurement-medium-10);
  width: 100%;

  &[data-side="right"] {
    justify-content: flex-end;
  }

  &[data-side="left"] {
    justify-content: flex-start;
  }
`;
