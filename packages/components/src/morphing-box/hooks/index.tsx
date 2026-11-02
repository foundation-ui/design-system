"use client";

import React, { createContext, useContext, useState } from "react";

import type {
  IMorphingBoxContext,
  IMorphingBoxProviderProperties,
} from "../types";

const noop = (): void => {};
const noopId = (): string => "";

const defaultMorphingBoxContext: IMorphingBoxContext = {
  id: "",
  states: {
    open: false,
  },
  methods: {
    toggleMorphingBox: noop,
    getMorphingBoxId: noopId,
  },
};

const MorphingBoxContext = createContext<IMorphingBoxContext>(
  defaultMorphingBoxContext,
);

export const useMorphingBox = (): IMorphingBoxContext =>
  useContext(MorphingBoxContext);

export const MorphingBoxProvider = ({
  children,
}: IMorphingBoxProviderProperties): React.JSX.Element => {
  const id = React.useId();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <MorphingBoxContext.Provider
      value={{
        id,
        states: {
          open,
        },
        methods: {
          toggleMorphingBox: () => setOpen((current) => !current),
          getMorphingBoxId: (type) => `${id}-${type}`,
        },
      }}
    >
      {children}
    </MorphingBoxContext.Provider>
  );
};
