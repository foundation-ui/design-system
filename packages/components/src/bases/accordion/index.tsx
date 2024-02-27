import React from "react";
import { AccordionProvider, useAccordion } from "./hooks";
import { Button, IButtonProperties } from "../button";

import { Container, IProximityProperties } from "../../";
import { IReactChildren, IComponentSpacing } from "../../../../../types";

export interface IAccordionComposition {
  Root: typeof AccordionRoot;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
}
export interface IAccordionProperties
  extends IProximityProperties,
    IComponentSpacing,
    React.ComponentProps<"div"> {}
export interface IAccordionTriggerProperties extends IButtonProperties {
  value: string;
}
export interface IAccordionContentProperties extends IAccordionProperties {
  defaultOpen?: boolean;
  value: string;
}

const AccordionRoot = ({ children }: IReactChildren) => {
  return <AccordionProvider>{children}</AccordionProvider>;
};
const Accordion = (props: IAccordionProperties) => {
  const { children, ...restProps } = props;
  const { id } = useAccordion();

  return (
    <Container id={id} {...restProps}>
      {children}
    </Container>
  );
};
const AccordionTrigger = (props: IAccordionTriggerProperties) => {
  const { value, disabled, onClick, children, ...restProps } = props;

  const { states, methods } = useAccordion();
  const { getAccordionId, applyValue } = methods;

  const hasSameValueAsContext = value === states.value;
  const IdHandler = {
    trigger: getAccordionId && getAccordionId({ value, type: "trigger" }),
    content: getAccordionId && getAccordionId({ value, type: "content" }),
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick && onClick(event);

      if (applyValue) {
        const unchangedValue = hasSameValueAsContext && states.value !== null;

        if (unchangedValue) applyValue(null);
        else applyValue(value);
      }
    }
  };

  return (
    <Button
      id={String(IdHandler.trigger)}
      value={value}
      disabled={disabled || false}
      onClick={handleClick}
      aria-expanded={hasSameValueAsContext}
      aria-controls={String(IdHandler.content)}
      data-state={hasSameValueAsContext ? "expanded" : "collapsed"}
      {...restProps}
    >
      {children}
    </Button>
  );
};
const AccordionContent = (props: IAccordionContentProperties) => {
  const { defaultOpen, value, children, ...restProps } = props;

  const { states, methods } = useAccordion();
  const { getAccordionId, applyValue } = methods;

  const hasSameValueAsContext = value === states.value;
  const IdHandler = {
    trigger: getAccordionId && getAccordionId({ value, type: "trigger" }),
    content: getAccordionId && getAccordionId({ value, type: "content" }),
  };

  React.useEffect(() => {
    if (defaultOpen && !hasSameValueAsContext && applyValue) applyValue(value);
  }, []);

  return (
    <React.Fragment>
      {hasSameValueAsContext && (
        <Container
          role="region"
          id={String(IdHandler.content)}
          aria-labelledby={String(IdHandler.trigger)}
          aria-expanded={hasSameValueAsContext}
          data-value={value}
          {...restProps}
        >
          {children}
        </Container>
      )}
    </React.Fragment>
  );
};

Accordion.Root = AccordionRoot;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export { Accordion, AccordionRoot, AccordionTrigger, AccordionContent };
