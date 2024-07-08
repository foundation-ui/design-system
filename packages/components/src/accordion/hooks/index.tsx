import React, { useState, createContext, useContext } from "react";
import { IReactChildren, IComponentAPI } from "../../../../../types";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};
const AccordionContext = createContext<IComponentAPI>(defaultComponentAPI);
export const useAccordion = () => useContext(AccordionContext);

export const AccordionProvider = ({
  children,
}: IReactChildren): JSX.Element => {
  const context = useAccordionProvider();

  return (
    <AccordionContext.Provider value={context}>
      {children}
    </AccordionContext.Provider>
  );
};

function useAccordionProvider(): IComponentAPI {
  const [value, setValue] = useState<string | null>(null);
  const accordionId = React.useId();

  return {
    id: accordionId,
    states: {
      value,
    },
    methods: {
      applyValue: (value: string): string | void => setValue(value),
      getAccordionId: ({ value, type }: Record<string, string>): string =>
        `${accordionId}-${type}-${value}`,
    },
  };
}
