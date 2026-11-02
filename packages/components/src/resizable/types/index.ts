import type * as React from "react";

export type ResizableEditorProperties = {
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  left: React.ReactNode;
  right: React.ReactNode;
};
