"use client";

import React, { createContext, useContext } from "react";

import type { IFieldContext, IFieldProviderProperties } from "../types";

const defaultFieldContext: IFieldContext = {
  id: "",
  states: {},
  methods: {},
};

const FieldContext = createContext<IFieldContext>(defaultFieldContext);

export const useField = (): IFieldContext => useContext(FieldContext);

export const FieldProvider = ({
  children,
}: IFieldProviderProperties): React.JSX.Element => {
  const id = React.useId();

  return (
    <FieldContext.Provider value={{ id, states: {}, methods: {} }}>
      {children}
    </FieldContext.Provider>
  );
};
