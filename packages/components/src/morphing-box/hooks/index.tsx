"use client";

import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const MorphingBoxContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useMorphingBox = () => useContext(MorphingBoxContext);

export const MorphingBoxProvider = ({
  children,
}: IReactChildren): React.JSX.Element => {
  const context = useMorphingBoxProvider();

  return (
    <MorphingBoxContext.Provider value={context}>
      {children}
    </MorphingBoxContext.Provider>
  );
};

function useMorphingBoxProvider(): IComponentAPI {
  const [open, setOpen] = useState<boolean>(false);
  const MorphingBoxId = React.useId();

  return {
    id: MorphingBoxId,
    states: {
      open: open,
    },
    methods: {
      toggleMorphingBox: () => setOpen(!open),
      getMorphingBoxId: (type: "trigger" | "MorphingBox"): string =>
        `${MorphingBoxId}-${type}`,
    },
  };
}
