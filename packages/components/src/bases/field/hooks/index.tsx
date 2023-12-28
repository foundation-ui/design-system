import React, { createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const FieldContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useField = () => useContext(FieldContext);

export const FieldProvider = ({ children }: IReactChildren): JSX.Element => {
  const context = useFieldProvider();

  return (
    <FieldContext.Provider value={context}>{children}</FieldContext.Provider>
  );
};

function useFieldProvider(): IComponentAPI {
  const fieldId = React.useId();

  return {
    id: fieldId,
    states: {},
    methods: {},
  };
}
