"use client";

import styled from "styled-components";
import { Button, Field } from "../../";

export const Wrapper = styled(Field.Wrapper)`
  position: relative;

  input {
    width: 100% !important;
  }
`;
export const Trigger = styled(Button)`
  position: absolute !important;
  right: var(--measurement-medium-50);
  top: calc(var(--measurement-medium-50));
`;
